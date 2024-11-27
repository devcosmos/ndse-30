import { Controller, Post, Get, Body, Query, Param, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { ChatService } from './chat.service';
import { SupportClientService } from './client/client.service';
import { SupportEmployeeService } from './employee/employee.service';
import { CreateMessageDto } from './interfaces/dto/create-message';
import { CreateMessageRequestDto } from './interfaces/dto/create-message-request';
import { MessageResponseDto } from './interfaces/dto/message-response';
import { HistoryMessageResponseDto } from './interfaces/dto/history-message-response';
import { IsReadMessageResponseDto } from './interfaces/dto/is-read-message-response';
import { IsCreatedMessageRequestDto } from './interfaces/dto/is-created-message-request';
import { SupportRequest } from './schemas/support-request.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { LoggedUser } from 'src/decorators/user';
import { Auth } from 'src/decorators/auth';
import { UsersService } from 'src/users/users.service';
import { UserRoles } from 'src/utils/consts';

@Controller('api')
export class ChatController {
  constructor(
    private readonly supportRequestService: ChatService,
    private readonly supportClientRequestService: SupportClientService,
    private readonly supportEmployeeRequestService: SupportEmployeeService,
    private readonly userService: UsersService,
    @InjectModel(SupportRequest.name)
    private supportRequestModel: Model<SupportRequest>,
  ) {}

  @Auth(UserRoles.Client)
  @Post('client/support-requests/')
  async createMessage(@Body() data: CreateMessageDto, @LoggedUser('email') email: string): Promise<CreateMessageRequestDto[]> {
    try {
      const user = await this.userService.findOneUser(email);
      const supportRequest = await this.supportClientRequestService.createSupportRequest({
        user: user._id.toString(),
        text: data.text,
      });
      return [
        {
          id: supportRequest['_id'].toString(),
          createdAt: new Date().toString(),
          isActive: true,
          hasNewMessages: false,
        },
      ];
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Auth(UserRoles.Client)
  @Get('client/support-requests/')
  async getSupportRequests(
    @LoggedUser('email') email: string,
    @Query('limit') limit: string,
    @Query('offset') offset: string,
    @Query('isActive') isActive: boolean,
  ): Promise<CreateMessageRequestDto[]> {
    try {
      const user = await this.userService.findOneUser(email);
      const userId = user._id.toString();

      const parsedLimit = limit ? parseInt(limit, 10) : null;
      const parsedOffset = offset ? parseInt(offset, 10) : null;

      let supportRequests = await this.supportRequestService.findSupportRequests({
        user: userId,
        isActive: isActive,
      });

      if (parsedLimit !== null && parsedOffset !== null) {
        supportRequests = supportRequests.slice(parsedOffset, parsedOffset + parsedLimit);
      }

      const supportRequestPromises = supportRequests.map(async (request) => {
        const messages = await this.supportRequestService.getMessages(request['_id']);
        const hasNewMessages = !messages.every((message) => message.readAt);
        return {
          id: request['_id'].toString(),
          createdAt: new Date().toString(),
          isActive: request.isActive,
          hasNewMessages: hasNewMessages,
        };
      });

      return Promise.all(supportRequestPromises);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Auth(UserRoles.Manager)
  @Get('manager/support-requests/')
  async getSupportRequestsForManager(@Query('limit') limit: number, @Query('offset') offset: number, @Query('isActive') isActive: boolean = true): Promise<MessageResponseDto[]> {
    try {
      const allRequests = await this.supportRequestModel.find({ isActive }).limit(limit).skip(offset);
      const supportRequests = allRequests.map(async (request) => {
        const user = await this.userService.findById(String(request.user));
        const messages = await this.supportRequestService.getMessages(request._id.toString());
        const hasNewMessages = !messages.every((message) => message.readAt);
        return {
          id: request._id.toString(),
          createdAt: request.createdAt.toString(),
          isActive: request.isActive,
          hasNewMessages: hasNewMessages,
          client: {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            contactPhone: user.contactPhone,
          },
        };
      });
      return Promise.all(supportRequests);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Auth(UserRoles.ManagerOrClient)
  @Get('common/support-requests/:id/messages')
  async getHistory(@Param('id') id: string, @LoggedUser('email') email: string, @LoggedUser('role') role: string): Promise<HistoryMessageResponseDto[]> {
    try {
      const client = await this.userService.findOneUser(email);
      const supportRequest = await this.supportRequestModel.findById(id);
      if (!supportRequest) {
        throw new NotFoundException('Такого обращения нет');
      }
      if (role === UserRoles.Client && client._id.toString() !== supportRequest.user.toString()) {
        throw new ForbiddenException('У вас нет доступа к этому обращению');
      }
      const supportRequestMessages = await this.supportRequestService.getMessages(id);
      const messages = supportRequestMessages.map(async (message) => {
        const author = await this.userService.findById(String(message.author));
        return {
          id: message['_id'],
          createdAt: message.sentAt.toString(),
          text: message.text,
          readAt: message.readAt ? message.readAt.toString() : null,
          author: {
            id: author._id.toString(),
            name: author.name,
          },
        };
      });

      return Promise.all(messages);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Auth(UserRoles.ManagerOrClient)
  @Post('common/support-requests/:id/messages')
  async sendMessage(@Body() data: CreateMessageDto, @Param('id') id: string, @LoggedUser('email') email: string, @LoggedUser('role') role: string): Promise<HistoryMessageResponseDto[]> {
    try {
      const client = await this.userService.findOneUser(email);
      const supportRequest = await this.supportRequestModel.findById(id);
      if (!supportRequest) {
        throw new NotFoundException('Такого обращения нет');
      }
      if (role === UserRoles.Client && client._id.toString() !== supportRequest.user.toString()) {
        throw new ForbiddenException('У вас нет доступа к этому обращению');
      }
      const message = await this.supportRequestService.sendMessage({
        author: client._id.toString(),
        supportRequest: id,
        text: data.text,
      });

      return [
        {
          id: supportRequest._id.toString(),
          createdAt: message.sentAt.toString(),
          text: message.text,
          readAt: message.readAt ? message.readAt.toString() : null,
          author: {
            id: client._id.toString(),
            name: client.name,
          },
        },
      ];
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Auth(UserRoles.ManagerOrClient)
  @Post('common/support-requests/:id/messages/read')
  async readMessages(@Body() data: IsCreatedMessageRequestDto, @Param('id') id: string, @LoggedUser('email') email: string, @LoggedUser('role') role: string): Promise<IsReadMessageResponseDto> {
    try {
      const client = await this.userService.findOneUser(email);
      const supportRequest = await this.supportRequestModel.findById(id);
      if (!supportRequest) {
        throw new NotFoundException('Такого обращения нет');
      }
      if (role === UserRoles.Client && client._id.toString() !== supportRequest.user.toString()) {
        throw new ForbiddenException('У вас нет доступа к этому обращению');
      }

      if (role === UserRoles.Manager) {
        await this.supportEmployeeRequestService.markMessagesAsRead({
          user: client._id.toString(),
          supportRequest: id,
          createdBefore: new Date(data.createdBefore),
        });
      }
      if (role === UserRoles.Client) {
        await this.supportClientRequestService.markMessagesAsRead({
          user: client._id.toString(),
          supportRequest: id,
          createdBefore: new Date(data.createdBefore),
        });
      }
      return {
        success: true,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}

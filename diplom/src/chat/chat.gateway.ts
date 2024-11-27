import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server } from 'socket.io';
import { IsAuthenticatedGuard } from 'src/guards/is-authenticated';
import { IsManagerOrClient } from 'src/guards/is-manager-or-client';
import { BadGatewayException, ForbiddenException, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SupportRequest } from './schemas/support-request.schema';
import { Model } from 'mongoose';
import { Message } from './schemas/message.schema';
import { LoggedUser } from 'src/decorators/user';
import { UsersService } from 'src/users/users.service';
import { UserRoles } from 'src/utils/consts';

@WebSocketGateway()
export class ChatGateway {
  constructor(
    private readonly supportRequestService: ChatService,
    private readonly userService: UsersService,
    @InjectModel(SupportRequest.name)
    private supportRequestModel: Model<SupportRequest>,
  ) {}

  @WebSocketServer()
  server: Server;

  @UseGuards(IsAuthenticatedGuard, IsManagerOrClient)
  @SubscribeMessage('subscribeToChat')
  async handleSubscribeToChat(@MessageBody('chatId') chatId: string, @LoggedUser('email') email: string, @LoggedUser('role') role: string) {
    try {
      const client = await this.userService.findOneUser(email);
      const supportRequest = await this.supportRequestModel.findById(chatId);
      if (!supportRequest) {
        throw new NotFoundException('Такого обращения нет');
      }
      if (role === UserRoles.Client && client._id.toString() !== supportRequest.user.toString()) {
        throw new ForbiddenException('У вас нет доступа к этому обращению');
      }

      const unsubscribe = this.supportRequestService.subscribe(async (_supportRequest: SupportRequest, message: Message) => {
        const author = await this.userService.findById(String(message.author));
        const messageData = {
          id: message['_id'].toString(),
          createdAt: message.sentAt,
          text: message.text,
          readAt: message.readAt ? message.readAt : null,
          author: {
            id: author._id,
            name: author.name,
          },
        };
        this.server.emit('chatMessage', messageData);
      });

      return unsubscribe;
    } catch (error) {
      throw new BadGatewayException(error.message);
    }
  }
}

import { Injectable } from '@nestjs/common';
import { IChatService } from './interfaces/support-request-service';
import { Message } from './schemas/message.schema';
import { SupportRequest } from './schemas/support-request.schema';
import { GetChatListParams } from './interfaces/get-chat-list-params';
import { SendMessageDto } from './interfaces/dto/send-message';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ChatService implements IChatService {
  constructor(
    @InjectModel(SupportRequest.name)
    private supportRequestModel: Model<SupportRequest>,
    @InjectModel(Message.name)
    private messageModel: Model<Message>,
  ) {}

  findSupportRequests(params: GetChatListParams): Promise<SupportRequest[]> {
    const { user, isActive } = params;
    if (!user) {
      return this.supportRequestModel.find({ isActive });
    }
    return this.supportRequestModel.find({ user, isActive });
  }

  async sendMessage(data: SendMessageDto): Promise<Message> {
    const { author, supportRequest, text } = data;
    const message = new this.messageModel({
      author,
      sentAt: new Date(),
      text,
    });
    await message.save();
    await this.supportRequestModel.findByIdAndUpdate(supportRequest, {
      $push: { messages: message._id },
    });
    return message;
  }

  async getMessages(supportRequest: string): Promise<Message[]> {
    const requestWithMessages = (await this.supportRequestModel.findById(supportRequest).populate('messages')) as any;
    return requestWithMessages.messages;
  }

  subscribe(handler: (supportRequest: SupportRequest, message: Message) => void): () => void {
    const subscription = this.supportRequestModel.watch().on('change', async (change) => {
      if (change.operationType === 'insert') {
        const newMessageId = change.fullDocument.messages[change.fullDocument.messages.length - 1];
        const newMessage = await this.messageModel.findById(newMessageId);
        handler(change.fullDocument, newMessage);
      }
    });

    return () => subscription.close();
  }
}

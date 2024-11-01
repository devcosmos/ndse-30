import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ISupportRequestEmployeeService } from '../interfaces/support-request-employee-service';
import { MarkMessagesAsReadDto } from '../interfaces/dto/mark-messages-as-read';
import { SupportRequest } from '../schemas/support-request.schema';
import { Message } from '../schemas/message.schema';

@Injectable()
export class SupportEmployeeService implements ISupportRequestEmployeeService {
  constructor(
    @InjectModel(SupportRequest.name)
    private supportRequestModel: Model<SupportRequest>,
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  async markMessagesAsRead(params: MarkMessagesAsReadDto) {
    const { user: userId, supportRequest: supportRequestId, createdBefore } = params;
    const supportRequest = await this.supportRequestModel.findById(supportRequestId);

    const messageIds = supportRequest.messages;
    const messagesToUpdate = await this.messageModel.find({
      _id: { $in: messageIds },
      author: { $ne: userId },
      sentAt: { $lt: createdBefore },
      readAt: { $exists: false },
    });

    await Promise.all(
      messagesToUpdate.map(async (message) => {
        message.readAt = new Date();
        await message.save();
      }),
    );
  }

  async getUnreadCount(supportRequest: string): Promise<number> {
    const fondedSupportRequest = await this.supportRequestModel.findById(supportRequest);
    const userId = fondedSupportRequest.user;
    const messageIds = fondedSupportRequest.messages;

    const messages = await this.messageModel.find({
      _id: { $in: messageIds },
      author: userId,
      readAt: { $exists: false },
    });

    return messages.length;
  }

  closeRequest(supportRequest: string): Promise<void> {
    return this.supportRequestModel.findByIdAndUpdate(supportRequest, {
      isActive: false,
    });
  }
}

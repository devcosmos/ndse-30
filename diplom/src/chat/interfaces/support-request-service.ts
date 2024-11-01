import { Message } from '../schemas/message.schema';
import { SupportRequest } from '../schemas/support-request.schema';
import { GetChatListParams } from './get-chat-list-params';
import { SendMessageDto } from '../interfaces/dto/send-message';

export interface IChatService {
  findSupportRequests(params: GetChatListParams): Promise<SupportRequest[]>;
  sendMessage(data: SendMessageDto): Promise<Message>;
  getMessages(supportRequest: string): Promise<Message[]>;
  subscribe(handler: (supportRequest: SupportRequest, message: Message) => void): () => void;
}

import { Message } from '../schemas/message.schema';
import { SupportRequest } from '../schemas/support-request.schema';
import { GetChatListParams } from './get-chat-list-params';
import { SendMessageDto } from '../interfaces/dto/send-message';
import { ID } from 'src/utils/types';

export interface IChatService {
  findSupportRequests(params: GetChatListParams): Promise<SupportRequest[]>;
  sendMessage(data: SendMessageDto): Promise<Message>;
  getMessages(supportRequest: ID): Promise<Message[]>;
  subscribe(handler: (supportRequest: SupportRequest, message: Message) => void): () => void;
}

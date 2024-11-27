import { SupportRequest } from '../schemas/support-request.schema';
import { CreateSupportRequestDto } from '../interfaces/dto/create-support-request';
import { MarkMessagesAsReadDto } from '../interfaces/dto/mark-messages-as-read';
import { ID } from 'src/utils/types';

export interface ISupportRequestClientService {
  createSupportRequest(data: CreateSupportRequestDto): Promise<SupportRequest>;
  markMessagesAsRead(params: MarkMessagesAsReadDto);
  getUnreadCount(supportRequest: ID): Promise<number>;
}

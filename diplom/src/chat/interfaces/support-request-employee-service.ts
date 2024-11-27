import { ID } from 'src/utils/types';
import { MarkMessagesAsReadDto } from '../interfaces/dto/mark-messages-as-read';

export interface ISupportRequestEmployeeService {
  markMessagesAsRead(params: MarkMessagesAsReadDto);
  getUnreadCount(supportRequest: ID): Promise<number>;
  closeRequest(supportRequest: ID): Promise<void>;
}

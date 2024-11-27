import { ID } from 'src/utils/types';

export interface GetChatListParams {
  user: ID | null;
  isActive: boolean;
}

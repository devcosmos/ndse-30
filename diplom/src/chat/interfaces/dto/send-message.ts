import { ID } from 'src/utils/types';

export interface SendMessageDto {
  author: ID;
  supportRequest: ID;
  text: string;
}

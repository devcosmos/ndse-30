import { ID } from 'src/utils/types';

export interface CreateSupportRequestDto {
  user: ID;
  text: string;
}

import { ID } from 'src/utils/types';

export interface SearchRoomsParams {
  limit: number;
  offset: number;
  hotel: ID;
  isEnabled?: boolean;
}

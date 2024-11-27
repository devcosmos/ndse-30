import { ID } from 'src/utils/types';

export class SearchRoomsParamsDto {
  limit: number;
  offset: number;
  hotel: ID;
  isEnabled?: boolean;
}

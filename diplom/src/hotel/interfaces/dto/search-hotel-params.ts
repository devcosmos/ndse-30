import { SearchHotelParams } from '../search-hotel-params';

export class SearchHotelParamsDto implements SearchHotelParams {
  limit: number;
  offset: number;
  title: string;
}

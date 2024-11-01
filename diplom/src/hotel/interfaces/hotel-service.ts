import { Hotel } from '../schemas/hotel.schema';
import { SearchHotelParams } from './search-hotel-params';
import { UpdateHotelParams } from './update-hotel-params';

export interface IHotelService {
  create(data: any): Promise<Hotel>;
  findById(id: string): Promise<Hotel>;
  search(params: SearchHotelParams): Promise<Hotel[]>;
  update(id: string, data: UpdateHotelParams): Promise<Hotel>;
}

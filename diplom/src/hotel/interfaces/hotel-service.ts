import { ID } from 'src/utils/types';
import { Hotel } from '../schemas/hotel.schema';
import { SearchHotelParams } from './search-hotel-params';
import { UpdateHotelParams } from './update-hotel-params';

export interface IHotelService {
  create(data: any): Promise<Hotel>;
  findById(id: ID): Promise<Hotel>;
  search(params: SearchHotelParams): Promise<Hotel[]>;
  update(id: ID, data: UpdateHotelParams): Promise<Hotel>;
}

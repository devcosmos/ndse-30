import { ID } from 'src/utils/types';
import { Room } from '../schemas/hotel-room.schema';
import { SearchRoomsParams } from './search-rooms-params';

export interface IRoomService {
  create(data: Partial<Room>): Promise<Room>;
  findById(id: ID): Promise<Room>;
  search(params: SearchRoomsParams): Promise<Room[]>;
  update(id: ID, data: Partial<Room>): Promise<Room>;
}

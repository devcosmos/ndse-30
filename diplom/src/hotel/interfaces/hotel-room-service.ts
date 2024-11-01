import { Room } from '../schemas/hotel-room.schema';
import { SearchRoomsParams } from './search-rooms-params';

export interface IRoomService {
  create(data: Partial<Room>): Promise<Room>;
  findById(id: string): Promise<Room>;
  search(params: SearchRoomsParams): Promise<Room[]>;
  update(id: string, data: Partial<Room>): Promise<Room>;
}

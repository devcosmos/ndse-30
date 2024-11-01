import { AddHotelRoomParamsDto } from './add-hotel-room-params';

export class UpdateHotelRoomParamsDto extends AddHotelRoomParamsDto {
  hotelId: string;
  description: string;
  isEnabled: boolean;
}

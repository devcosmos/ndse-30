import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { Room, RoomSchema } from '../schemas/hotel-room.schema';
import { Hotel, HotelSchema } from '../schemas/hotel.schema';
import { HotelService } from '../hotel.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Hotel.name, schema: HotelSchema }]), MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }])],
  controllers: [RoomsController],
  providers: [RoomsService, HotelService],
})
export class RoomsModule {}

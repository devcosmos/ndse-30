import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelController } from './hotel.controller';
import { RoomsModule } from './rooms/rooms.module';
import { Hotel, HotelSchema } from './schemas/hotel.schema';

@Module({
  imports: [RoomsModule, MongooseModule.forFeature([{ name: Hotel.name, schema: HotelSchema }])],
  controllers: [HotelController],
  providers: [HotelService],
})
export class HotelModule {}

import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelModule } from './hotel/hotel.module';
import { ReservationModule } from './reservation/reservation.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [UsersModule, AuthModule, HotelModule, ReservationModule, ChatModule, ConfigModule.forRoot(), MongooseModule.forRoot(process.env.MONGO_CONNECTION)],
  controllers: [],
  providers: [],
})
export class AppModule {}

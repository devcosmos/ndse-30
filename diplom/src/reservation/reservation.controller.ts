import { Controller, Delete, Get, Body, Post, BadRequestException, Query, Param, ForbiddenException } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationDto } from './interfaces/dto/reservation';
import { InjectModel } from '@nestjs/mongoose';
import { Hotel } from 'src/hotel/schemas/hotel.schema';
import { Room } from 'src/hotel/schemas/hotel-room.schema';
import { Model } from 'mongoose';
import { Reservation } from './schemas/reservation.schema';
import { AddReservationResponseDto } from './interfaces/dto/add-reservation-response';
import { LoggedUser } from 'src/decorators/user';
import { Auth } from 'src/decorators/auth';
import { User } from 'src/users/schemas/user.schema';
import { UserRoles } from 'src/utils/consts';

@Controller('api')
export class ReservationController {
  constructor(
    private readonly reservationService: ReservationService,
    @InjectModel(Reservation.name) private ReservationModel: Model<Reservation>,
    @InjectModel(User.name) private UserModel: Model<User>,
    @InjectModel(Hotel.name) private HotelModel: Model<Hotel>,
    @InjectModel(Room.name) private HotelRoomModel: Model<Room>,
  ) {}

  reservationsHandler(reservations: Reservation[]): Promise<any[]> {
    const reservationPromises = reservations.map(async (reservation) => {
      const [room, hotel] = await Promise.all([this.HotelRoomModel.findById(reservation.roomId), this.HotelModel.findById(reservation.hotelId)]);
      return {
        startDate: reservation.dateStart,
        endDate: reservation.dateEnd,
        hotelRoom: {
          description: room?.description,
          images: room?.images,
        },
        hotel: {
          title: hotel?.title,
          description: hotel?.description,
        },
      };
    });
    return Promise.all(reservationPromises);
  }

  @Auth(UserRoles.Client)
  @Post('client/reservations')
  async addClientReservations(@Body() reservationDto: ReservationDto, @LoggedUser('email') email: string): Promise<AddReservationResponseDto> {
    try {
      const { hotelRoom, startDate, endDate } = reservationDto;
      const user = await this.UserModel.findOne({ email });
      const room = await this.HotelRoomModel.findOne({ _id: hotelRoom });

      if (!room) {
        throw new BadRequestException('Такой номер не найден');
      }
      if (!room.isEnabled) {
        throw new BadRequestException('Номер недоступен');
      }
      const hotel = await this.HotelModel.findById({ _id: room.hotel });
      const hotelId = room.hotel as string;
      const userId = user._id.toString();
      const roomId = room._id.toString();
      const data = {
        userId,
        hotelId,
        roomId,
        dateStart: new Date(startDate),
        dateEnd: new Date(endDate),
      };

      const reservation = await this.reservationService.addReservation(data);
      return {
        startDate: reservation.dateStart.toString(),
        endDate: reservation.dateEnd.toString(),
        hotelRoom: {
          description: room.description,
          images: room.images,
        },
        hotel: {
          title: hotel.title,
          description: hotel.description,
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Auth(UserRoles.Client)
  @Get('client/reservations')
  async getClientReservations(@LoggedUser() loggedUser: User, @Query('dateStart') dateStart: string, @Query('dateEnd') dateEnd: string): Promise<AddReservationResponseDto[]> {
    try {
      const user = await this.UserModel.findOne({ email: loggedUser.email });
      const reservations = await this.reservationService.getReservations({
        userId: user._id.toString(),
        dateStart: new Date(dateStart),
        dateEnd: new Date(dateEnd),
      });

      return this.reservationsHandler(reservations);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Auth(UserRoles.Client)
  @Delete('client/reservations/:id')
  async removeClientReservations(@Param('id') id: string, @LoggedUser() loggedUser: User): Promise<void> {
    try {
      const user = await this.UserModel.findOne({ email: loggedUser.email });
      const userId = user._id.toString();
      const roomReservation = await this.ReservationModel.findById(id);
      if (!roomReservation) {
        throw new BadRequestException('Бронь не найдена');
      }
      const roomReservationUserId = roomReservation.userId.toString();
      if (userId !== roomReservationUserId) {
        throw new ForbiddenException('Нельзя отменить бронь другого пользователя');
      }

      this.reservationService.removeReservation(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Auth(UserRoles.Manager)
  @Get('manager/reservations/:userId')
  async getManagerReservationsForClient(@Param('userId') userId: string): Promise<AddReservationResponseDto[]> {
    try {
      const reservations = await this.ReservationModel.find({
        userId,
      });
      return this.reservationsHandler(reservations);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Auth(UserRoles.Manager)
  @Delete('manager/reservations/:id')
  async removeManagerReservationsForClient(@Param('id') id: string): Promise<void> {
    try {
      const reservation = await this.ReservationModel.findById(id);
      if (!reservation) {
        throw new BadRequestException('Бронь не найдена');
      }
      this.reservationService.removeReservation(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}

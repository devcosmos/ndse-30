import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IReservation } from './interfaces/reservation';
import { Reservation } from './schemas/reservation.schema';
import { ReservationDto } from './interfaces/reservation-dto';
import { ReservationSearchOptions } from './interfaces/reservation-search-options';

@Injectable()
export class ReservationService implements IReservation {
  constructor(@InjectModel(Reservation.name) private ReservationModel: Model<Reservation>) {}

  async addReservation(data: ReservationDto): Promise<Reservation> {
    const { userId, hotelId, roomId, dateStart, dateEnd } = data;
    return this.ReservationModel.create({
      userId,
      hotelId,
      roomId,
      dateStart,
      dateEnd,
    });
  }

  async removeReservation(id: string): Promise<void> {
    await this.ReservationModel.deleteOne({ _id: id });
  }

  getReservations(filter: ReservationSearchOptions): Promise<Reservation[]> {
    const { userId, dateStart, dateEnd } = filter;
    return this.ReservationModel.find({
      userId,
      dateStart: { $gte: dateStart },
      dateEnd: { $lte: dateEnd },
    });
  }
}

import { Reservation } from '../schemas/reservation.schema';
import { ReservationDto } from './reservation-dto';
import { ReservationSearchOptions } from './reservation-search-options';

export interface IReservation {
  addReservation(data: ReservationDto): Promise<Reservation>;
  removeReservation(id: string): Promise<void>;
  getReservations(filter: ReservationSearchOptions): Promise<Array<Reservation>>;
}

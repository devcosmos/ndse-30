import { ID } from 'src/utils/types';

export interface ReservationSearchOptions {
  userId: ID;
  dateStart: Date;
  dateEnd: Date;
}

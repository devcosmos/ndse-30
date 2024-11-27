export class AddReservationResponseDto {
  startDate: string;
  endDate: string;
  hotelRoom: {
    description: string;
    images: string[];
  };
  hotel: {
    title: string;
    description: string;
  };
}

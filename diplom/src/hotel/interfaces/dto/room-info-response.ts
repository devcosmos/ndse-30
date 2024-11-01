export class RoomInfoResponseDto {
  id: string;
  description: string;
  images: string[];
  hotel: {
    id: string;
    title: string;
    description: string;
  };
}

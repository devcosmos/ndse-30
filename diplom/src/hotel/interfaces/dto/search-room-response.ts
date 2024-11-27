export class SearchRoomResponseDto {
  id: string;
  description: string;
  images: string[];
  hotel: {
    id: string;
    title: string;
  };
}

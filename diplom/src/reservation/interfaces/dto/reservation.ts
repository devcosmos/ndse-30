import { BadRequestException } from '@nestjs/common';
import { IsDateString, validateOrReject } from 'class-validator';

export class ReservationDto {
  hotelRoom: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  async isValidEndDate(): Promise<void> {
    const startDate = new Date(this.startDate);
    const endDate = new Date(this.endDate);

    if (startDate >= endDate) {
      throw new BadRequestException('Дата окончания не может быть раньше даты начала');
    }

    await validateOrReject(this);
  }
}

import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { UpdateHotelParamsDto } from './interfaces/dto/update-hotel-params';
import { AddHotelParamsDto } from './interfaces/dto/add-hotel-params';
import { SearchHotelParamsDto } from './interfaces/dto/search-hotel-params';
import { AddHotelResponseDto } from './interfaces/dto/add-hotel-response';
import { Auth } from 'src/decorators/auth';
import { UserRoles } from 'src/utils/consts';

@Controller('api')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Auth(UserRoles.Admin)
  @Post('admin/hotels/')
  async addHotels(@Body() data: AddHotelParamsDto): Promise<AddHotelResponseDto> {
    try {
      const hotel = await this.hotelService.create(data);
      return {
        id: hotel._id.toString(),
        title: hotel.title,
        description: hotel.description,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Auth(UserRoles.Admin)
  @Get('admin/hotels/')
  async getHotels(@Query() params: SearchHotelParamsDto): Promise<AddHotelResponseDto[]> {
    try {
      const hotels = await this.hotelService.search(params);
      return hotels.map((hotel) => ({
        id: hotel._id.toString(),
        title: hotel.title,
        description: hotel.description,
      }));
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Auth(UserRoles.Admin)
  @Put('admin/hotels/:id')
  async changeHotel(@Param('id') id: string, @Body() data: UpdateHotelParamsDto): Promise<AddHotelResponseDto> {
    try {
      const hotel = await this.hotelService.update(id, data);
      if (!hotel) {
        throw new NotFoundException('Гостиница не найдена');
      }
      return {
        id: hotel._id.toString(),
        title: hotel.title,
        description: hotel.description,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}

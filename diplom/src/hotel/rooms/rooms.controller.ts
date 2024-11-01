import {
  BadRequestException,
  Body,
  Controller,
  FileTypeValidator,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { promises as fs } from 'fs';
import { FilesInterceptor } from '@nestjs/platform-express';
import { RoomsService } from './rooms.service';
import { AddHotelRoomParamsDto } from '../interfaces/dto/add-hotel-room-params';
import { HotelService } from '../hotel.service';
import { storageConfig } from './config/disk-storage';
import { UpdateHotelRoomParamsDto } from '../interfaces/dto/update-hotel-room-params';
import { AddRoomResponseDto } from '../interfaces/dto/add-room-response';
import { SearchRoomResponseDto } from '../interfaces/dto/search-room-response';
import { SearchRoomsParamsDto } from '../interfaces/dto/search-rooms-params';
import { RoomInfoResponseDto } from '../interfaces/dto/room-info-response';
import { LoggedUser } from 'src/decorators/user';
import { Auth } from 'src/decorators/auth';
import { UserRoles } from 'src/utils/consts';

@Controller('api')
export class RoomsController {
  constructor(
    private readonly RoomsService: RoomsService,
    private readonly hotelService: HotelService,
  ) {}

  @Auth(UserRoles.Admin)
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: storageConfig,
    }),
  )
  @Post('admin/hotel-rooms/')
  async addHotelRoom(
    @Body() data: AddHotelRoomParamsDto,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /^image\// })],
        fileIsRequired: false,
      }),
    )
    multerImagesArray: Express.Multer.File[],
  ): Promise<AddRoomResponseDto> {
    try {
      const hotel = await this.hotelService.findById(data.hotelId);
      const images = multerImagesArray.map((file) => file.path);

      if (!hotel) {
        throw new BadRequestException('Гостиница не найдена');
      }
      const hotelRoom = await this.RoomsService.create({
        hotel: data.hotelId,
        description: data.description,
        images: images,
      });

      return {
        id: hotelRoom._id.toString(),
        description: hotelRoom.description,
        images: images,
        isEnabled: hotelRoom.isEnabled,
        hotel: {
          id: hotel._id.toString(),
          title: hotel.title,
          description: hotel.description,
        },
      };
    } catch (error) {
      if (multerImagesArray && multerImagesArray.length > 0) {
        try {
          for (const file of multerImagesArray) {
            await fs.unlink(file.path);
          }
        } catch (error) {
          throw new InternalServerErrorException('Ошибка при удалении файлов');
        }
      }
      throw new BadRequestException(error.message);
    }
  }

  @Get('common/hotel-rooms')
  async getRooms(@Query() params: SearchRoomsParamsDto, @LoggedUser('role') role: string): Promise<SearchRoomResponseDto[]> {
    const { limit, offset, hotel, isEnabled = undefined } = params;
    try {
      const searchedHotel = await this.hotelService.findById(hotel);

      if (!searchedHotel) {
        throw new NotFoundException('Гостиница не найдена');
      }

      const searchedRooms = await this.RoomsService.search({
        limit,
        offset,
        hotel,
        isEnabled: !role || role === UserRoles.Client ? true : isEnabled,
      });

      return searchedRooms.map((room) => ({
        id: room._id.toString(),
        description: room.description,
        images: room.images,
        isEnabled: room.isEnabled,
        hotel: {
          id: searchedHotel._id.toString(),
          title: searchedHotel.title,
        },
      }));
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('common/hotel-rooms/:id')
  async getHotelRoom(@Param('id') id: string): Promise<RoomInfoResponseDto> {
    try {
      const hotelRoom = await this.RoomsService.findById(id);

      if (hotelRoom) {
        const hotel = await this.hotelService.findById(hotelRoom.hotel);

        return {
          id: hotelRoom._id.toString(),
          description: hotelRoom.description,
          images: hotelRoom.images,
          hotel: {
            id: hotelRoom.hotel.toString(),
            title: hotel.title,
            description: hotel.description,
          },
        };
      } else {
        throw new NotFoundException('Номер не найден');
      }
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Auth(UserRoles.Admin)
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: storageConfig,
    }),
  )
  @Put('admin/hotel-rooms/:id')
  async changeHotelRoom(
    @Param('id') id: string,
    @Body() data: UpdateHotelRoomParamsDto,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /^image\// })],
        fileIsRequired: false,
      }),
    )
    multerImagesArray: Express.Multer.File[],
  ): Promise<AddRoomResponseDto> {
    try {
      const hotel = await this.hotelService.findById(data.hotelId);
      const hotelRoom = await this.RoomsService.findById(id);
      const images = multerImagesArray.map((file) => file.path);

      if (!hotel) {
        throw new BadRequestException('Гостиница не найдена');
      }
      if (!hotelRoom) {
        throw new BadRequestException('Номер не найден');
      }
      const updatedHotelRoom = await this.RoomsService.update(id, {
        hotel: data.hotelId,
        description: data.description,
        isEnabled: data.isEnabled,
        images: [...hotelRoom.images, ...images],
      });

      return {
        id: updatedHotelRoom._id.toString(),
        description: updatedHotelRoom.description,
        images: updatedHotelRoom.images,
        isEnabled: updatedHotelRoom.isEnabled,
        hotel: {
          id: hotel._id.toString(),
          title: hotel.title,
          description: hotel.description,
        },
      };
    } catch (error) {
      if (multerImagesArray && multerImagesArray.length > 0) {
        try {
          for (const file of multerImagesArray) {
            await fs.unlink(file.path);
          }
        } catch (error) {
          throw new InternalServerErrorException('Ошибка при удалении файлов');
        }
      }
      throw new BadRequestException(error.message);
    }
  }
}

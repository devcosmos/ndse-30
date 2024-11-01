import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IHotelService } from './interfaces/hotel-service';
import { Hotel, HotelDocument } from './schemas/hotel.schema';
import { SearchHotelParams } from './interfaces/search-hotel-params';
import { UpdateHotelParams } from './interfaces/update-hotel-params';
import { IHotel } from './interfaces/hotel';
import { ID } from 'src/utils/types';

@Injectable()
export class HotelService implements IHotelService {
  constructor(@InjectModel(Hotel.name) private hotelModel: Model<Hotel>) {}

  create(data: IHotel): Promise<HotelDocument> {
    const hotel = new this.hotelModel({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    if (hotel) {
      return hotel.save();
    } else {
      throw new BadRequestException();
    }
  }

  findByTitle(title: string): Promise<HotelDocument> {
    return this.hotelModel.findOne({ title });
  }

  findById(id: ID): Promise<HotelDocument> {
    return this.hotelModel.findOne({ _id: id });
  }

  search(params: SearchHotelParams): Promise<HotelDocument[]> {
    const { title = '', limit, offset } = params;
    return this.hotelModel
      .find({
        title: { $regex: title, $options: 'i' },
      })
      .skip(offset)
      .limit(limit);
  }

  update(id: ID, data: UpdateHotelParams): Promise<HotelDocument> {
    const hotel = this.findById(id);
    if (hotel) {
      return this.hotelModel.findOneAndUpdate(
        { _id: id },
        { ...data, updatedAt: new Date() },
        {
          new: true,
        },
      );
    } else {
      throw new NotFoundException();
    }
  }
}

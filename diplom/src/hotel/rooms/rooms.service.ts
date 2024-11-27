import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRoomService } from '../interfaces/hotel-room-service';
import { Room, HotelRoomDocument } from '../schemas/hotel-room.schema';
import { SearchRoomsParams } from '../interfaces/search-rooms-params';
import { ID } from 'src/utils/types';

@Injectable()
export class RoomsService implements IRoomService {
  constructor(
    @InjectModel(Room.name)
    private HotelRoomModel: Model<Room>,
  ) {}

  create(data: Partial<HotelRoomDocument>): Promise<HotelRoomDocument> {
    const room = new this.HotelRoomModel({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
      isEnabled: true,
    });

    return room.save();
  }

  findById(id: ID): Promise<HotelRoomDocument> {
    return this.HotelRoomModel.findOne({ _id: id });
  }

  search(params: SearchRoomsParams): Promise<HotelRoomDocument[]> {
    const { limit, offset, hotel, isEnabled = undefined } = params;
    if (isEnabled === undefined) {
      return this.HotelRoomModel.find({ hotel }).limit(limit).skip(offset);
    }
    return this.HotelRoomModel.find({ hotel, isEnabled }).limit(limit).skip(offset);
  }

  async update(id: ID, data: Partial<HotelRoomDocument>): Promise<HotelRoomDocument> {
    return this.HotelRoomModel.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
  }
}

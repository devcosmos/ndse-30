import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type HotelRoomDocument = HydratedDocument<Room>;

@Schema()
export class Room {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Hotel',
    required: true,
  })
  hotel: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: false, default: [] })
  images: string[];

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  updatedAt: Date;

  @Prop({ required: true, default: true })
  isEnabled: boolean;
}

export const RoomSchema = SchemaFactory.createForClass(Room);

import { BadRequestException, Injectable } from '@nestjs/common';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './interfaces/dto/create-user';
import * as bcrypt from 'bcrypt';
import { CreateUserResponseDto } from './interfaces/dto/create-user-response';
import { GetUsersResponseDto } from './interfaces/dto/get-users-response';
import { ISearchUserParams } from './interfaces/search-user-params';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  async getUsers(params: ISearchUserParams): Promise<GetUsersResponseDto[]> {
    const { limit, offset, email = '', name = '', contactPhone = '' } = params;

    try {
      const users = await this.UserModel.find({
        $and: [{ email: { $regex: email, $options: 'i' } }, { name: { $regex: name, $options: 'i' } }, { contactPhone: { $regex: contactPhone, $options: 'i' } }],
      })
        .skip(offset)
        .limit(limit);

      return users.map(({ _id, email, name, contactPhone }) => ({
        id: _id.toString(),
        email,
        name,
        contactPhone,
      }));
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createUser(data: CreateUserDto): Promise<CreateUserResponseDto> {
    const saltOrRounds = 10;
    const password = data.password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    const newData = {
      email: data.email,
      passwordHash: hash,
      name: data.name,
      contactPhone: data.contactPhone,
      role: data.role,
    };

    try {
      const user = await this.UserModel.create(newData);
      return {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        contactPhone: user.contactPhone,
        role: user.role,
      };
    } catch (err) {
      throw new BadRequestException('Пользователь с таким E-mail уже зарегистрирован.');
    }
  }

  async findOneUser(email: string): Promise<any> {
    return this.UserModel.findOne({ email: email }).exec();
  }

  async findById(id: string): Promise<UserDocument> {
    return this.UserModel.findOne({ _id: id });
  }
}

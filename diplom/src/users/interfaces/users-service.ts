import { ID } from 'src/utils/types';
import { User } from '../schemas/user.schema';
import { CreateUserDto } from './dto/create-user';
import { CreateUserResponseDto } from './dto/create-user-response';
import { GetUsersResponseDto } from './dto/get-users-response';
import { ISearchUserParams } from './search-user-params';

export interface IUsersService {
  createUser(data: CreateUserDto): Promise<CreateUserResponseDto>;
  findById(id: ID): Promise<User>;
  findOneUser(email: string): Promise<User>;
  getUsers(params: ISearchUserParams): Promise<GetUsersResponseDto[]>;
}

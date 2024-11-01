import { User } from '../schemas/user.schema';
import { IParamId } from './param-id';
import { ISearchUserParams } from './search-user-params';

export interface IUserService {
  create(data: Partial<User>): Promise<User>;
  findById(id: IParamId): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findAll(params: ISearchUserParams): Promise<User[]>;
}

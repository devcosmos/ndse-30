import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { Auth } from 'src/decorators/auth';
import { UserRoles } from 'src/utils/consts';
import { CreateUserDto } from './interfaces/dto/create-user';
import { CreateUserResponseDto } from './interfaces/dto/create-user-response';
import { GetUsersResponseDto } from './interfaces/dto/get-users-response';
import { ISearchUserParams } from './interfaces/search-user-params';

@Controller('api')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Auth(UserRoles.Admin)
  @Post('/admin/users')
  createUser(@Body() data: CreateUserDto): Promise<CreateUserResponseDto> {
    return this.userService.createUser(data);
  }

  @Auth(UserRoles.Admin)
  @Get('/admin/users')
  getUsersForAdmin(@Query() params: ISearchUserParams): Promise<GetUsersResponseDto[]> {
    return this.userService.getUsers(params);
  }

  @Auth(UserRoles.Manager)
  @Get('/manager/users')
  getUsersForManager(@Query() params: ISearchUserParams): Promise<GetUsersResponseDto[]> {
    return this.userService.getUsers(params);
  }
}

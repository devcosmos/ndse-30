import { BadRequestException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { UserSignInResponseDto } from './dto/user-sign-in-response';
import { User } from 'src/users/schemas/user.schema';
import { UserSignInDto } from './dto/user-sign-in';
import { UserSignUpDto } from './dto/user-sign-up';
import { UserSignUpResponseDto } from './dto/user-sign-up-response';
import { UserRoles } from 'src/utils/consts';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<{
    email: string;
    name: string;
    contactPhone: string;
    role: string;
  }> {
    const user = await this.userService.findOneUser(email);
    if (!user) {
      throw new UnauthorizedException('Такого пользователя не существует');
    }
    const passwordHash = await bcrypt.compare(password, user.passwordHash);
    if (!passwordHash) {
      throw new UnauthorizedException('Имя или пароль не верны');
    }
    if (user && passwordHash) {
      return {
        email: user.email,
        name: user.name,
        contactPhone: user.contactPhone,
        role: user.role,
      };
    }
    return null;
  }

  async login(data: UserSignInDto): Promise<UserSignInResponseDto> {
    try {
      const user: User = await this.userService.findOneUser(data.email);

      return {
        email: user.email,
        name: user.name,
        contactPhone: user.contactPhone,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async logout(request: Request, response: Response): Promise<any> {
    try {
      request.session.destroy(() => {
        response.status(HttpStatus.OK).json({
          message: 'Вы успешно вышли',
        });
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async register(data: UserSignUpDto): Promise<UserSignUpResponseDto> {
    try {
      const user = await this.userService.createUser({
        ...data,
        role: UserRoles.Client,
      });
      return {
        id: user.id.toString(),
        email: user.email,
        name: user.name,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}

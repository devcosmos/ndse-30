import { IsEmail, IsNotEmpty, IsPhoneNumber, IsOptional, MinLength } from 'class-validator';
import { IsUniqueEmail } from 'src/utils/is-unique-email.validator';

export class UserSignUpDto {
  @IsEmail({}, { message: 'Некорректный формат email адреса' })
  @IsNotEmpty({ message: 'Поле "email" не должно быть пустым' })
  @IsUniqueEmail({ message: 'Пользователь с таким email уже существует' })
  email: string;

  @IsNotEmpty({ message: 'Поле "password" не должно быть пустым' })
  @MinLength(6, { message: 'Пароль должен быть не менее 6 символов' })
  password: string;

  @IsNotEmpty({ message: 'Поле "name" не должно быть пустым' })
  name: string;

  @IsPhoneNumber('RU', { message: 'Некорректный формат номера телефона' })
  @IsOptional()
  contactPhone: string;
}

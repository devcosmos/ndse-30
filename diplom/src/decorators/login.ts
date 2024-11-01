import { UseGuards, applyDecorators } from '@nestjs/common';
import { IsNotAuthenticatedGuard } from 'src/guards/is-not-authenticated';
import { LocalAuthGuard } from 'src/guards/auth';

export function Login() {
  return applyDecorators(UseGuards(IsNotAuthenticatedGuard, LocalAuthGuard));
}

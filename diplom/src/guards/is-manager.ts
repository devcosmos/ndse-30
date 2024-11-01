import { UserRoles } from 'src/utils/consts';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class IsManager implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.role === UserRoles.Manager) {
      return true;
    }

    throw new ForbiddenException('Доступ запрещен');
  }
}
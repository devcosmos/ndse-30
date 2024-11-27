import { UserRoles } from 'src/utils/consts';
import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { IsAuthenticatedGuard } from 'src/guards/is-authenticated';
import { RolesGuard } from 'src/guards/roles';

export function Auth(...roles: UserRoles[]) {
  return applyDecorators(SetMetadata('roles', roles), UseGuards(IsAuthenticatedGuard, RolesGuard));
}

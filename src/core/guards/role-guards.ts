import {
  Injectable, CanActivate, ExecutionContext,
  ForbiddenException, UnauthorizedException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/role.decorator';
import { UserRole } from '@prisma/client';
import { PUBLIC } from '../decorators/publick.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC, [
      context.getHandler(), context.getClass(), // keep this order
    ]);
    if (isPublic) return true;

    const requiredRoles =
      this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
        context.getHandler(), context.getClass(),
      ]) || [];

    // if no @Roles() is set, allow authenticated users
    if (requiredRoles.length === 0) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) throw new UnauthorizedException('Auth required');

    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Sizda ruxsat yo‘q');
    }
    return true;
  }
}

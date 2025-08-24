import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../entities/user.entity';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
import { Permission, hasPermission, getUserPermissions } from '../permissions/permission.system';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    // Check role-based access
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Check permission-based access
    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If no roles or permissions required, allow access
    if (!requiredRoles && !requiredPermissions) {
      return true;
    }

    const userRole: UserRole = user.role;
    const userDepartmentId: number | null = user.departmentId || null;

    // Store user context in request for later use
    request.userContext = {
      userId: user.userId,
      role: userRole,
      departmentId: userDepartmentId,
      permissions: getUserPermissions(userRole),
    };

    // Check roles if specified
    if (requiredRoles) {
      const hasRequiredRole = requiredRoles.some((role) => userRole === role);
      if (!hasRequiredRole) {
        throw new ForbiddenException(`Access denied. Required roles: ${requiredRoles.join(', ')}`);
      }
    }

    // Check permissions if specified
    if (requiredPermissions) {
      const hasRequiredPermissions = requiredPermissions.every((permission) => 
        hasPermission(userRole, permission)
      );
      if (!hasRequiredPermissions) {
        throw new ForbiddenException(`Access denied. Missing required permissions.`);
      }
    }

    return true;
  }
}

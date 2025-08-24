import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import type { Request } from 'express';
import { canAccessResource } from '../permissions/permission.system';
import type { UserContext } from '../interfaces/auth-response.interface';

interface AuthenticatedRequest extends Request {
  user?: Record<string, any>;
  userContext?: UserContext;
}

@Injectable()
export class DepartmentAccessGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const user = request.user;
    const userContext = request.userContext;

    if (!user || !userContext) {
      throw new ForbiddenException('User not authenticated');
    }

    // Extract resource department ID from request parameters or body
    const resourceDepartmentId = this.extractResourceDepartmentId(request);

    if (resourceDepartmentId !== null) {
      const canAccess = canAccessResource(
        userContext.role,
        userContext.departmentId,
        resourceDepartmentId,
      );

      if (!canAccess) {
        throw new ForbiddenException(
          'Access denied. You can only access resources within your department.',
        );
      }
    }

    return true;
  }

  private extractResourceDepartmentId(
    request: AuthenticatedRequest,
  ): number | null {
    // Try to get department ID from various sources
    const params = request.params;
    const body = request.body as Record<string, any>;
    const query = request.query;

    // Check common parameter names
    if (
      params &&
      'departmentId' in params &&
      typeof params.departmentId === 'string'
    ) {
      return parseInt(params.departmentId, 10);
    }

    if (
      body &&
      'departmentId' in body &&
      typeof body.departmentId === 'string'
    ) {
      return parseInt(body.departmentId, 10);
    }

    if (
      query &&
      'departmentId' in query &&
      typeof query.departmentId === 'string'
    ) {
      return parseInt(query.departmentId, 10);
    }

    // For resource-related endpoints, we might need to look up the resource
    // This would require additional database queries in a real implementation
    if (params && 'resourceId' in params) {
      // TODO: Look up resource department from database
      // For now, return null to allow the service layer to handle it
      return null;
    }

    return null;
  }
}

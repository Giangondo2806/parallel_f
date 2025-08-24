import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from '../guards/roles.guard';
import {
  Permission,
  hasPermission,
  getUserPermissions,
} from '../permissions/permission.system';
import { UserRole } from '../../entities/user.entity';
import type { UserContext } from '../interfaces/auth-response.interface';

interface MockRequest {
  user?: any;
  userContext?: UserContext;
}

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: Reflector;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesGuard,
        {
          provide: Reflector,
          useValue: {
            getAllAndOverride: jest.fn(),
          },
        },
      ],
    }).compile();

    guard = module.get<RolesGuard>(RolesGuard);
    reflector = module.get<Reflector>(Reflector);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  describe('Permission System', () => {
    it('should correctly assign admin permissions', () => {
      const adminPermissions = getUserPermissions(UserRole.ADMIN);
      expect(adminPermissions).toContain(Permission.SYSTEM_ADMIN);
      expect(adminPermissions).toContain(Permission.MANAGE_USERS);
      expect(adminPermissions).toContain(Permission.MANAGE_DEPARTMENTS);
    });

    it('should correctly assign RA permissions', () => {
      const raPermissions = getUserPermissions(UserRole.RA);
      expect(raPermissions).toContain(Permission.MANAGE_RESOURCES);
      expect(raPermissions).toContain(Permission.UPLOAD_FILE);
      expect(raPermissions).not.toContain(Permission.SYSTEM_ADMIN);
    });

    it('should correctly assign Manager permissions', () => {
      const managerPermissions = getUserPermissions(UserRole.MANAGER);
      expect(managerPermissions).toContain(
        Permission.READ_DEPARTMENT_RESOURCES,
      );
      expect(managerPermissions).toContain(Permission.READ_DEPARTMENT_HISTORY);
      expect(managerPermissions).not.toContain(Permission.CREATE_USER);
    });

    it('should correctly assign Viewer permissions', () => {
      const viewerPermissions = getUserPermissions(UserRole.VIEWER);
      expect(viewerPermissions).toContain(Permission.READ_DEPARTMENT_RESOURCES);
      expect(viewerPermissions).not.toContain(Permission.UPDATE_RESOURCE);
      expect(viewerPermissions).not.toContain(Permission.DELETE_RESOURCE);
    });

    it('should correctly validate permissions', () => {
      const adminHasSystemAdmin = hasPermission(UserRole.ADMIN, Permission.SYSTEM_ADMIN);
      const raHasManageResources = hasPermission(UserRole.RA, Permission.MANAGE_RESOURCES);
      const viewerHasDeleteResource = hasPermission(UserRole.VIEWER, Permission.DELETE_RESOURCE);
      const managerHasSystemAdmin = hasPermission(UserRole.MANAGER, Permission.SYSTEM_ADMIN);
      
      expect(adminHasSystemAdmin).toBe(true);
      expect(raHasManageResources).toBe(true);
      expect(viewerHasDeleteResource).toBe(false);
      expect(managerHasSystemAdmin).toBe(false);
    });
  });

  describe('canActivate', () => {
    let mockExecutionContext: ExecutionContext;
    let mockRequest: MockRequest;

    beforeEach(() => {
      mockRequest = {
        user: {
          userId: 1,
          username: 'testuser',
          role: UserRole.RA,
        },
        userContext: {
          userId: 1,
          username: 'testuser',
          role: UserRole.RA,
          departmentId: 1,
        } as UserContext,
      };

      mockExecutionContext = {
        switchToHttp: () => ({
          getRequest: (): MockRequest => mockRequest,
        }),
        getHandler: () => ({}),
        getClass: () => ({}),
      } as ExecutionContext;
    });

    it('should allow access when user has required permission', () => {
      jest
        .spyOn(reflector, 'getAllAndOverride')
        .mockReturnValue([Permission.MANAGE_RESOURCES]);

      const result = guard.canActivate(mockExecutionContext);
      expect(result).toBe(true);
    });

    it('should deny access when user lacks required permission', () => {
      jest
        .spyOn(reflector, 'getAllAndOverride')
        .mockReturnValue([Permission.SYSTEM_ADMIN]);

      expect(() => guard.canActivate(mockExecutionContext)).toThrow(
        'Insufficient permissions',
      );
    });

    it('should allow access when no permissions required', () => {
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);

      const result = guard.canActivate(mockExecutionContext);
      expect(result).toBe(true);
    });

    it('should deny access when user is not authenticated', () => {
      mockRequest.user = undefined;
      mockRequest.userContext = undefined;

      expect(() => guard.canActivate(mockExecutionContext)).toThrow(
        'User not authenticated',
      );
    });
  });
});

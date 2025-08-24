import { UserRole } from '../../entities/user.entity';

// Define permission actions
export enum Permission {
  // User Management
  CREATE_USER = 'create:user',
  READ_USER = 'read:user',
  UPDATE_USER = 'update:user',
  DELETE_USER = 'delete:user',
  MANAGE_USERS = 'manage:users',

  // Department Management
  CREATE_DEPARTMENT = 'create:department',
  READ_DEPARTMENT = 'read:department',
  UPDATE_DEPARTMENT = 'update:department',
  DELETE_DEPARTMENT = 'delete:department',
  MANAGE_DEPARTMENTS = 'manage:departments',

  // Resource Management
  CREATE_RESOURCE = 'create:resource',
  READ_RESOURCE = 'read:resource',
  UPDATE_RESOURCE = 'update:resource',
  DELETE_RESOURCE = 'delete:resource',
  MANAGE_RESOURCES = 'manage:resources',
  READ_ALL_RESOURCES = 'read:all_resources',
  READ_DEPARTMENT_RESOURCES = 'read:department_resources',

  // File Management
  UPLOAD_FILE = 'upload:file',
  DOWNLOAD_FILE = 'download:file',
  DELETE_FILE = 'delete:file',
  MANAGE_FILES = 'manage:files',

  // History & Reporting
  READ_HISTORY = 'read:history',
  READ_ALL_HISTORY = 'read:all_history',
  READ_DEPARTMENT_HISTORY = 'read:department_history',
  EXPORT_DATA = 'export:data',
  GENERATE_REPORTS = 'generate:reports',

  // System Administration
  SYSTEM_ADMIN = 'system:admin',
  VIEW_STATS = 'view:stats',
  MANAGE_SYSTEM = 'manage:system',
}

// Role-based permission mapping
export const RolePermissions: Record<UserRole, Permission[]> = {
  [UserRole.ADMIN]: [
    // Full system access
    Permission.SYSTEM_ADMIN,
    Permission.MANAGE_SYSTEM,
    Permission.VIEW_STATS,

    // User management
    Permission.MANAGE_USERS,
    Permission.CREATE_USER,
    Permission.READ_USER,
    Permission.UPDATE_USER,
    Permission.DELETE_USER,

    // Department management
    Permission.MANAGE_DEPARTMENTS,
    Permission.CREATE_DEPARTMENT,
    Permission.READ_DEPARTMENT,
    Permission.UPDATE_DEPARTMENT,
    Permission.DELETE_DEPARTMENT,

    // Resource management
    Permission.MANAGE_RESOURCES,
    Permission.CREATE_RESOURCE,
    Permission.READ_RESOURCE,
    Permission.UPDATE_RESOURCE,
    Permission.DELETE_RESOURCE,
    Permission.READ_ALL_RESOURCES,

    // File management
    Permission.MANAGE_FILES,
    Permission.UPLOAD_FILE,
    Permission.DOWNLOAD_FILE,
    Permission.DELETE_FILE,

    // History & reporting
    Permission.READ_ALL_HISTORY,
    Permission.EXPORT_DATA,
    Permission.GENERATE_REPORTS,
  ],

  [UserRole.RA]: [
    // Resource management (full access)
    Permission.MANAGE_RESOURCES,
    Permission.CREATE_RESOURCE,
    Permission.READ_RESOURCE,
    Permission.UPDATE_RESOURCE,
    Permission.DELETE_RESOURCE,
    Permission.READ_ALL_RESOURCES,

    // File management
    Permission.UPLOAD_FILE,
    Permission.DOWNLOAD_FILE,
    Permission.DELETE_FILE,

    // Department access
    Permission.READ_DEPARTMENT,

    // Limited user access (read only for coordination)
    Permission.READ_USER,

    // History access
    Permission.READ_ALL_HISTORY,
    Permission.EXPORT_DATA,
    Permission.GENERATE_REPORTS,
  ],

  [UserRole.MANAGER]: [
    // Resource management (department only)
    Permission.CREATE_RESOURCE,
    Permission.READ_RESOURCE,
    Permission.UPDATE_RESOURCE,
    Permission.DELETE_RESOURCE,
    Permission.READ_DEPARTMENT_RESOURCES,

    // File management (department resources only)
    Permission.UPLOAD_FILE,
    Permission.DOWNLOAD_FILE,
    Permission.DELETE_FILE,

    // Department access
    Permission.READ_DEPARTMENT,

    // Limited user access (department only)
    Permission.READ_USER,

    // History access (department only)
    Permission.READ_DEPARTMENT_HISTORY,
    Permission.EXPORT_DATA,
    Permission.GENERATE_REPORTS,
  ],

  [UserRole.VIEWER]: [
    // Read-only access
    Permission.READ_RESOURCE,
    Permission.READ_DEPARTMENT_RESOURCES,
    Permission.READ_DEPARTMENT,
    Permission.DOWNLOAD_FILE,
    Permission.READ_DEPARTMENT_HISTORY,
  ],
};

// Helper functions
export function hasPermission(userRole: UserRole, permission: Permission): boolean {
  return RolePermissions[userRole]?.includes(permission) || false;
}

export function getUserPermissions(userRole: UserRole): Permission[] {
  return RolePermissions[userRole] || [];
}

export function canAccessResource(
  userRole: UserRole,
  userDepartmentId: number | null,
  resourceDepartmentId: number | null,
): boolean {
  // Admin and RA can access all resources
  if (userRole === UserRole.ADMIN || userRole === UserRole.RA) {
    return true;
  }

  // Manager and Viewer can only access resources in their department
  if (userRole === UserRole.MANAGER || userRole === UserRole.VIEWER) {
    return userDepartmentId === resourceDepartmentId;
  }

  return false;
}

export function canManageUser(
  currentUserRole: UserRole,
  currentUserDepartmentId: number | null,
  targetUserRole: UserRole,
  targetUserDepartmentId: number | null,
): boolean {
  // Admin can manage all users
  if (currentUserRole === UserRole.ADMIN) {
    return true;
  }

  // RA cannot manage users
  if (currentUserRole === UserRole.RA) {
    return false;
  }

  // Manager can only view users in their department, cannot manage
  if (currentUserRole === UserRole.MANAGER) {
    return false; // Managers cannot create/update/delete users
  }

  // Viewers cannot manage users
  return false;
}

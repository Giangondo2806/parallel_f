# Role-Based Access Control (RBAC) Documentation

## Overview

The IRMS (Idle Resource Management System) implements a comprehensive Role-Based Access Control system with four distinct user roles and granular permissions.

## User Roles

### 1. ADMIN (System Administrator)
- **Full system access**
- Can manage all users, departments, and resources
- System-wide administrative capabilities
- Access to all data and reports

### 2. RA (Resource Administrator)
- **Resource management focus**
- Can create, update, and delete resources
- Manage files and uploads
- Access to department-level resources
- Cannot manage users or system settings

### 3. MANAGER (Department Manager)
- **Department-level oversight**
- Read access to department resources
- Can view department history and reports
- Limited resource management capabilities
- Cannot create/delete resources

### 4. VIEWER (Read-only User)
- **Minimal access level**
- Read-only access to department resources
- Can download files within department
- Cannot modify any data
- No administrative capabilities

## Permission System

### Permission Categories

#### User Management
- `CREATE_USER` - Create new users
- `READ_USER` - View user information
- `UPDATE_USER` - Modify user details
- `DELETE_USER` - Remove users
- `MANAGE_USERS` - Full user management

#### Department Management
- `CREATE_DEPARTMENT` - Create departments
- `READ_DEPARTMENT` - View department info
- `UPDATE_DEPARTMENT` - Modify departments
- `DELETE_DEPARTMENT` - Remove departments
- `MANAGE_DEPARTMENTS` - Full department management

#### Resource Management
- `CREATE_RESOURCE` - Create new resources
- `READ_RESOURCE` - View resource details
- `UPDATE_RESOURCE` - Modify resources
- `DELETE_RESOURCE` - Remove resources
- `MANAGE_RESOURCES` - Full resource management
- `READ_ALL_RESOURCES` - View all system resources
- `READ_DEPARTMENT_RESOURCES` - View department resources only

#### File Management
- `UPLOAD_FILE` - Upload files
- `DOWNLOAD_FILE` - Download files
- `DELETE_FILE` - Remove files
- `MANAGE_FILES` - Full file management

#### History & Reporting
- `READ_HISTORY` - View basic history
- `READ_ALL_HISTORY` - View all system history
- `READ_DEPARTMENT_HISTORY` - View department history
- `EXPORT_DATA` - Export data
- `GENERATE_REPORTS` - Generate reports

#### System Administration
- `SYSTEM_ADMIN` - System administration
- `VIEW_STATS` - View system statistics
- `MANAGE_SYSTEM` - System management

## Implementation Components

### 1. Permission System (`/permissions/permission.system.ts`)
- Defines all permissions as enum
- Maps roles to permissions
- Provides utility functions for permission checking
- Handles department-level access control

### 2. Guards

#### RolesGuard (`/guards/roles.guard.ts`)
- Validates user permissions for endpoints
- Integrates with JWT authentication
- Checks both role-based and permission-based access

#### DepartmentAccessGuard (`/guards/department-access.guard.ts`)
- Enforces department-level resource access
- Prevents cross-department data access
- Extracts department context from requests

#### JwtAuthGuard (`/guards/jwt-auth.guard.ts`)
- Validates JWT tokens
- Extracts user context
- Sets up authentication state

### 3. Decorators

#### @RequirePermissions (`/decorators/permissions.decorator.ts`)
- Method decorator for permission requirements
- Integrates with RolesGuard
- Supports multiple permission validation

#### @Roles (`/decorators/roles.decorator.ts`)
- Method decorator for role requirements
- Simple role-based access control
- Legacy support for role-only checks

### 4. Interfaces

#### UserContext (`/interfaces/auth-response.interface.ts`)
- Standardized user context structure
- Includes role and department information
- Used across guards and services

## Usage Examples

### Controller Implementation

```typescript
@Controller('resources')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ResourcesController {
  
  @Post()
  @RequirePermissions(Permission.CREATE_RESOURCE)
  @UseGuards(DepartmentAccessGuard)
  async createResource(@Body() createDto: CreateResourceDto) {
    // Only users with CREATE_RESOURCE permission can access
    // DepartmentAccessGuard ensures department-level access
  }

  @Get('stats')
  @RequirePermissions(Permission.VIEW_STATS)
  async getStats() {
    // Only ADMIN and users with VIEW_STATS permission
  }
}
```

### Service-Level Permission Checking

```typescript
import { hasPermission, canAccessResource } from '../auth/permissions/permission.system';

export class ResourceService {
  async getResource(id: number, userContext: UserContext) {
    // Check if user has permission
    if (!hasPermission(userContext.role, Permission.READ_RESOURCE)) {
      throw new ForbiddenException('Insufficient permissions');
    }

    // Check department access
    const resource = await this.findResource(id);
    if (!canAccessResource(userContext.role, userContext.departmentId, resource.departmentId)) {
      throw new ForbiddenException('Department access denied');
    }

    return resource;
  }
}
```

## Department Access Rules

### Cross-Department Access Matrix

| Role | Own Department | Other Departments | All Departments |
|------|----------------|-------------------|-----------------|
| ADMIN | ✅ Full Access | ✅ Full Access | ✅ Full Access |
| RA | ✅ Full Access | ❌ No Access | ❌ No Access |
| MANAGER | ✅ Read Access | ❌ No Access | ❌ No Access |
| VIEWER | ✅ Read Access | ❌ No Access | ❌ No Access |

### Resource Access Patterns

1. **ADMIN**: Can access resources across all departments
2. **RA**: Can manage resources only within their assigned department
3. **MANAGER**: Can view resources only within their assigned department
4. **VIEWER**: Can view resources only within their assigned department

## Security Features

### 1. Multi-Level Protection
- JWT authentication (identity verification)
- Role-based authorization (capability checking)
- Permission-based authorization (granular access)
- Department-level isolation (data segregation)

### 2. Guard Chain Processing
```
Request → JwtAuthGuard → RolesGuard → DepartmentAccessGuard → Controller
```

### 3. Error Handling
- `401 Unauthorized`: Invalid or missing JWT
- `403 Forbidden`: Insufficient permissions or department access denied
- Clear error messages for debugging

## Testing

### Unit Tests
- Permission system validation
- Guard behavior verification
- Role-permission mapping accuracy

### Integration Tests
- End-to-end permission flows
- Department access isolation
- Cross-role access scenarios

## Best Practices

### 1. Principle of Least Privilege
- Users get minimum permissions needed
- Department isolation by default
- Explicit permission grants required

### 2. Defense in Depth
- Multiple authorization layers
- Guard composition for complex scenarios
- Service-level permission verification

### 3. Maintainability
- Centralized permission definitions
- Reusable guard components
- Clear separation of concerns

## Migration and Updates

### Adding New Permissions
1. Add permission to `Permission` enum
2. Update `RolePermissions` mapping
3. Apply to relevant controllers
4. Update documentation and tests

### Role Modifications
1. Update permission mappings
2. Test access scenarios
3. Document changes
4. Coordinate with frontend team

## Common Troubleshooting

### Permission Denied Issues
1. Check JWT token validity
2. Verify user role assignment
3. Confirm permission mapping
4. Validate department context

### Department Access Issues
1. Verify user's department assignment
2. Check resource department ownership
3. Confirm department access rules
4. Review guard application order

---

*This RBAC system provides robust security while maintaining flexibility for the IRMS application. All components work together to ensure secure, role-appropriate access to system resources.*

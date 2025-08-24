import { AppDataSource } from '../data-source';
import { User, UserRole } from '../../entities/user.entity';
import { Department } from '../../entities/department.entity';
import * as bcrypt from 'bcrypt';

export async function seedUsers(departments: Department[]): Promise<User[]> {
  const userRepository = AppDataSource.getRepository(User);

  // Hash password for development
  const defaultPassword = await bcrypt.hash('admin123', 10);
  const userPassword = await bcrypt.hash('user123', 10);

  const usersData = [
    // Admin Users
    {
      username: 'admin',
      email: 'admin@company.com',
      fullName: 'System Administrator',
      passwordHash: defaultPassword,
      role: UserRole.ADMIN,
      isActive: true,
      departmentId: undefined, // Admin has access to all departments
    },
    {
      username: 'superadmin',
      email: 'superadmin@company.com',
      fullName: 'Super Administrator',
      passwordHash: defaultPassword,
      role: UserRole.ADMIN,
      isActive: true,
      departmentId: undefined,
    },

    // RA (Resource Administrator) Users
    {
      username: 'ra.nguyen',
      email: 'ra.nguyen@company.com',
      fullName: 'Nguyen Van RA',
      passwordHash: userPassword,
      role: UserRole.RA,
      isActive: true,
      departmentId: departments.find(d => d.departmentCode === 'HR')?.departmentId,
    },
    {
      username: 'ra.tran',
      email: 'ra.tran@company.com',
      fullName: 'Tran Thi RA',
      passwordHash: userPassword,
      role: UserRole.RA,
      isActive: true,
      departmentId: departments.find(d => d.departmentCode === 'HR')?.departmentId,
    },

    // Manager Users (one for each department)
    {
      username: 'mgr.it',
      email: 'manager.it@company.com',
      fullName: 'IT Department Manager',
      passwordHash: userPassword,
      role: UserRole.MANAGER,
      isActive: true,
      departmentId: departments.find(d => d.departmentCode === 'IT')?.departmentId,
    },
    {
      username: 'mgr.hr',
      email: 'manager.hr@company.com',
      fullName: 'HR Department Manager',
      passwordHash: userPassword,
      role: UserRole.MANAGER,
      isActive: true,
      departmentId: departments.find(d => d.departmentCode === 'HR')?.departmentId,
    },
    {
      username: 'mgr.fin',
      email: 'manager.finance@company.com',
      fullName: 'Finance Department Manager',
      passwordHash: userPassword,
      role: UserRole.MANAGER,
      isActive: true,
      departmentId: departments.find(d => d.departmentCode === 'FIN')?.departmentId,
    },
    {
      username: 'mgr.mkt',
      email: 'manager.marketing@company.com',
      fullName: 'Marketing Department Manager',
      passwordHash: userPassword,
      role: UserRole.MANAGER,
      isActive: true,
      departmentId: departments.find(d => d.departmentCode === 'MKT')?.departmentId,
    },
    {
      username: 'mgr.ops',
      email: 'manager.operations@company.com',
      fullName: 'Operations Manager',
      passwordHash: userPassword,
      role: UserRole.MANAGER,
      isActive: true,
      departmentId: departments.find(d => d.departmentCode === 'OPS')?.departmentId,
    },

    // Viewer Users
    {
      username: 'viewer.le',
      email: 'viewer.le@company.com',
      fullName: 'Le Van Viewer',
      passwordHash: userPassword,
      role: UserRole.VIEWER,
      isActive: true,
      departmentId: departments.find(d => d.departmentCode === 'IT')?.departmentId,
    },
    {
      username: 'viewer.pham',
      email: 'viewer.pham@company.com',
      fullName: 'Pham Thi Viewer',
      passwordHash: userPassword,
      role: UserRole.VIEWER,
      isActive: true,
      departmentId: departments.find(d => d.departmentCode === 'MKT')?.departmentId,
    },
    {
      username: 'viewer.hoang',
      email: 'viewer.hoang@company.com',
      fullName: 'Hoang Van Viewer',
      passwordHash: userPassword,
      role: UserRole.VIEWER,
      isActive: true,
      departmentId: departments.find(d => d.departmentCode === 'FIN')?.departmentId,
    },

    // Additional test users for different scenarios
    {
      username: 'inactive.user',
      email: 'inactive@company.com',
      fullName: 'Inactive Test User',
      passwordHash: userPassword,
      role: UserRole.VIEWER,
      isActive: false, // Inactive user for testing
      departmentId: departments.find(d => d.departmentCode === 'IT')?.departmentId,
    },
    {
      username: 'new.manager',
      email: 'new.manager@company.com',
      fullName: 'New Department Manager',
      passwordHash: userPassword,
      role: UserRole.MANAGER,
      isActive: true,
      departmentId: departments.find(d => d.departmentCode === 'QA')?.departmentId,
    },
  ];

  const users = userRepository.create(usersData);
  return await userRepository.save(users);
}

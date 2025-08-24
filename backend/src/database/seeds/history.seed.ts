import { AppDataSource } from '../data-source';
import { UpdateHistory, ActionType } from '../../entities/update-history.entity';
import { IdleResource } from '../../entities/idle-resource.entity';
import { User } from '../../entities/user.entity';

export async function seedUpdateHistory(resources: IdleResource[], users: User[]): Promise<UpdateHistory[]> {
  const historyRepository = AppDataSource.getRepository(UpdateHistory);

  // Get users for updated_by
  const adminUser = users.find(u => u.username === 'admin');
  const raUser = users.find(u => u.username === 'ra.nguyen');
  const managerUser = users.find(u => u.username === 'mgr.it');
  
  if (!adminUser || !raUser || !managerUser) {
    throw new Error('Required users not found for seeding update history');
  }

  // Helper function to get date relative to today
  const daysAgo = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
  };

  const historyData = [
    // System initialization entries
    {
      resourceId: undefined,
      tableName: 'users',
      actionType: ActionType.CREATE,
      oldValues: null,
      newValues: { username: 'admin', role: 'Admin' },
      changeDescription: 'System administrator account created',
      updatedBy: adminUser.userId,
      updatedAt: daysAgo(120),
    },
    {
      resourceId: undefined,
      tableName: 'departments',
      actionType: ActionType.CREATE,
      oldValues: null,
      newValues: { departmentCode: 'IT', departmentName: 'Information Technology' },
      changeDescription: 'IT department created',
      updatedBy: adminUser.userId,
      updatedAt: daysAgo(115),
    },

    // Resource creation histories
    {
      resourceId: resources.find(r => r.employeeCode === 'IT001')?.resourceId,
      tableName: 'idle_resources',
      actionType: ActionType.CREATE,
      oldValues: null,
      newValues: {
        employeeCode: 'IT001',
        fullName: 'Nguyen Van Duc',
        status: 'Available',
        departmentId: resources.find(r => r.employeeCode === 'IT001')?.departmentId,
      },
      changeDescription: 'New idle resource added: Nguyen Van Duc (Senior Java Developer)',
      updatedBy: adminUser.userId,
      updatedAt: daysAgo(90),
    },
    {
      resourceId: resources.find(r => r.employeeCode === 'IT002')?.resourceId,
      tableName: 'idle_resources',
      actionType: ActionType.CREATE,
      oldValues: null,
      newValues: {
        employeeCode: 'IT002',
        fullName: 'Tran Thi Mai',
        status: 'Available',
        departmentId: resources.find(r => r.employeeCode === 'IT002')?.departmentId,
      },
      changeDescription: 'New idle resource added: Tran Thi Mai (Frontend Developer)',
      updatedBy: raUser.userId,
      updatedAt: daysAgo(45),
    },

    // Resource updates
    {
      resourceId: resources.find(r => r.employeeCode === 'IT004')?.resourceId,
      tableName: 'idle_resources',
      actionType: ActionType.UPDATE,
      oldValues: { status: 'Available', processNote: 'Waiting for assignment' },
      newValues: { status: 'Training', processNote: 'Currently taking advanced Node.js certification course.' },
      changeDescription: 'Status changed from Available to Training for Pham Thi Linh',
      updatedBy: managerUser.userId,
      updatedAt: daysAgo(25),
    },
    {
      resourceId: resources.find(r => r.employeeCode === 'IT006')?.resourceId,
      tableName: 'idle_resources',
      actionType: ActionType.UPDATE,
      oldValues: { status: 'Available', isUrgent: true },
      newValues: { status: 'Assigned', isUrgent: false },
      changeDescription: 'Resource assigned to new project after 4 months idle period',
      updatedBy: managerUser.userId,
      updatedAt: daysAgo(5),
    },

    // CV upload histories
    {
      resourceId: resources.find(r => r.employeeCode === 'IT001')?.resourceId,
      tableName: 'cv_files',
      actionType: ActionType.CV_UPLOAD,
      oldValues: null,
      newValues: { fileName: 'Nguyen_Van_Duc_CV.pdf', fileSize: 524288 },
      changeDescription: 'CV file uploaded for Nguyen Van Duc',
      updatedBy: adminUser.userId,
      updatedAt: daysAgo(85),
    },
    {
      resourceId: resources.find(r => r.employeeCode === 'IT002')?.resourceId,
      tableName: 'cv_files',
      actionType: ActionType.CV_UPLOAD,
      oldValues: null,
      newValues: { fileName: 'Tran_Thi_Mai_Resume.docx', fileSize: 356789 },
      changeDescription: 'CV file uploaded for Tran Thi Mai',
      updatedBy: raUser.userId,
      updatedAt: daysAgo(40),
    },

    // Bulk operations
    {
      resourceId: undefined,
      tableName: 'idle_resources',
      actionType: ActionType.BULK_UPDATE,
      oldValues: { count: 5, field: 'isUrgent', value: false },
      newValues: { count: 5, field: 'isUrgent', value: true },
      changeDescription: 'Bulk update: Marked 5 resources as urgent (idle > 60 days)',
      updatedBy: raUser.userId,
      updatedAt: daysAgo(30),
    },

    // Import/Export activities
    {
      resourceId: undefined,
      tableName: 'idle_resources',
      actionType: ActionType.IMPORT,
      oldValues: null,
      newValues: { recordsImported: 3, source: 'CSV_import_2024_Q4.csv' },
      changeDescription: 'Imported 3 new idle resources from CSV file',
      updatedBy: raUser.userId,
      updatedAt: daysAgo(60),
    },
    {
      resourceId: undefined,
      tableName: 'idle_resources',
      actionType: ActionType.EXPORT,
      oldValues: null,
      newValues: { recordsExported: 15, format: 'Excel', filters: 'IT Department, Available' },
      changeDescription: 'Exported 15 IT department resources to Excel for review',
      updatedBy: managerUser.userId,
      updatedAt: daysAgo(20),
    },

    // Login/Logout activities (recent)
    {
      resourceId: undefined,
      tableName: 'sessions',
      actionType: ActionType.LOGIN,
      oldValues: null,
      newValues: { username: 'admin', ipAddress: '192.168.1.100' },
      changeDescription: 'System administrator logged in',
      updatedBy: adminUser.userId,
      updatedAt: daysAgo(1),
    },
    {
      resourceId: undefined,
      tableName: 'sessions',
      actionType: ActionType.LOGIN,
      oldValues: null,
      newValues: { username: 'ra.nguyen', ipAddress: '192.168.1.101' },
      changeDescription: 'Resource administrator logged in',
      updatedBy: raUser.userId,
      updatedAt: daysAgo(1),
    },
    {
      resourceId: undefined,
      tableName: 'sessions',
      actionType: ActionType.LOGIN,
      oldValues: null,
      newValues: { username: 'mgr.it', ipAddress: '192.168.1.102' },
      changeDescription: 'IT Manager logged in',
      updatedBy: managerUser.userId,
      updatedAt: daysAgo(2),
    },

    // Recent resource updates
    {
      resourceId: resources.find(r => r.employeeCode === 'QA001')?.resourceId,
      tableName: 'idle_resources',
      actionType: ActionType.UPDATE,
      oldValues: { processNote: 'Waiting for assignment' },
      newValues: { processNote: 'Long-term testing project completed. Expert in automation testing.' },
      changeDescription: 'Updated process note for QA001 - Hoang Van Tuan',
      updatedBy: raUser.userId,
      updatedAt: daysAgo(10),
    },
    {
      resourceId: resources.find(r => r.employeeCode === 'MKT002')?.resourceId,
      tableName: 'idle_resources',
      actionType: ActionType.UPDATE,
      oldValues: { isUrgent: false },
      newValues: { isUrgent: true },
      changeDescription: 'Marked as urgent: Bui Thi Lan (idle > 60 days)',
      updatedBy: raUser.userId,
      updatedAt: daysAgo(15),
    },

    // CV file deletions
    {
      resourceId: resources.find(r => r.employeeCode === 'IT005')?.resourceId,
      tableName: 'cv_files',
      actionType: ActionType.CV_DELETE,
      oldValues: { fileName: 'old_cv.pdf', fileSize: 445566 },
      newValues: null,
      changeDescription: 'Deleted outdated CV file for Nguyen Thi Thao',
      updatedBy: raUser.userId,
      updatedAt: daysAgo(8),
    },

    // Department changes
    {
      resourceId: resources.find(r => r.employeeCode === 'OPS001')?.resourceId,
      tableName: 'idle_resources',
      actionType: ActionType.UPDATE,
      oldValues: { rate: '1800 USD' },
      newValues: { rate: '1900 USD' },
      changeDescription: 'Rate updated for Truong Thi Mai based on performance review',
      updatedBy: managerUser.userId,
      updatedAt: daysAgo(12),
    },
  ];

  const historyEntries = historyRepository.create(historyData);
  return await historyRepository.save(historyEntries);
}

// Mock data for Dashboard UI components - BC001 Implementation
// This data is for frontend UI display only and will be replaced by real API calls

export interface DashboardStats {
  totalIdle: number;
  urgentCount: number;
  availableNow: number;
  assignedThisWeek: number;
  trend: {
    totalChange: number;
    urgentChange: number;
    availableChange: number;
    assignedChange: number;
  };
  lastUpdated: Date;
}

export interface Activity {
  id: number;
  action: string;
  description: string;
  userName: string;
  resourceName?: string;
  timestamp: Date;
  icon: string;
}

export interface DepartmentData {
  department: string;
  total: number;
  urgent: number;
  available: number;
  utilizationRate?: number;
}

// Mock dashboard statistics - simulating various scenarios
export const mockDashboardStats: DashboardStats = {
  totalIdle: 45,
  urgentCount: 12, // Resources idle ≥2 months
  availableNow: 23,
  assignedThisWeek: 10,
  trend: {
    totalChange: +8, // +8 from last week
    urgentChange: +3, // +3 urgent resources from last week
    availableChange: -5, // -5 available (assigned to projects)
    assignedChange: +10, // +10 assignments this week
  },
  lastUpdated: new Date('2025-01-10T10:30:00'),
};

// Mock recent activities - comprehensive activity scenarios
export const mockRecentActivities: Activity[] = [
  {
    id: 1,
    action: 'update',
    description: 'RA updated resource #123 - Nguyen Van A',
    userName: 'RA001',
    resourceName: 'Nguyen Van A',
    timestamp: new Date('2025-01-10T09:30:00'),
    icon: 'edit',
  },
  {
    id: 2,
    action: 'create',
    description: 'New resource added by Manager - Tran Thi B (IT Department)',
    userName: 'MGR_IT',
    resourceName: 'Tran Thi B',
    timestamp: new Date('2025-01-10T08:45:00'),
    icon: 'add',
  },
  {
    id: 3,
    action: 'download',
    description: 'Bulk CV download: 5 CVs downloaded by Admin',
    userName: 'Admin',
    timestamp: new Date('2025-01-10T07:20:00'),
    icon: 'download',
  },
  {
    id: 4,
    action: 'assignment',
    description: 'Resource Le Van C assigned to Project Alpha',
    userName: 'MGR_QA',
    resourceName: 'Le Van C',
    timestamp: new Date('2025-01-09T16:15:00'),
    icon: 'assignment',
  },
  {
    id: 5,
    action: 'import',
    description: 'Bulk import: 15 resources imported from CSV',
    userName: 'RA002',
    timestamp: new Date('2025-01-09T14:30:00'),
    icon: 'upload',
  },
  {
    id: 6,
    action: 'system',
    description: 'System backup completed successfully',
    userName: 'System',
    timestamp: new Date('2025-01-09T23:00:00'),
    icon: 'backup',
  },
  {
    id: 7,
    action: 'urgent',
    description: 'Resource Hoang Thi D marked as urgent (idle > 2 months)',
    userName: 'System',
    resourceName: 'Hoang Thi D',
    timestamp: new Date('2025-01-09T12:00:00'),
    icon: 'warning',
  },
  {
    id: 8,
    action: 'cv_update',
    description: 'CV updated for resource Pham Van E',
    userName: 'RA003',
    resourceName: 'Pham Van E',
    timestamp: new Date('2025-01-09T10:45:00'),
    icon: 'file',
  },
];

// Mock department breakdown data - various department scenarios
export const mockDepartmentData: DepartmentData[] = [
  { 
    department: 'IT', 
    total: 15, 
    urgent: 4, 
    available: 8,
    utilizationRate: 73.3
  },
  { 
    department: 'QA', 
    total: 12, 
    urgent: 3, 
    available: 7,
    utilizationRate: 58.3
  },
  { 
    department: 'HR', 
    total: 8, 
    urgent: 2, 
    available: 4,
    utilizationRate: 50.0
  },
  { 
    department: 'Finance', 
    total: 6, 
    urgent: 2, 
    available: 3,
    utilizationRate: 50.0
  },
  { 
    department: 'Marketing', 
    total: 4, 
    urgent: 1, 
    available: 1,
    utilizationRate: 25.0
  },
];

// Mock department filter options
export const mockDepartmentOptions = [
  { value: 'all', label: 'All Departments' },
  { value: 'IT', label: 'IT Department' },
  { value: 'QA', label: 'QA Department' },
  { value: 'HR', label: 'HR Department' },
  { value: 'Finance', label: 'Finance Department' },
  { value: 'Marketing', label: 'Marketing Department' },
];

// Helper functions for mock data manipulation
export const getMockStatsForDepartment = (departmentId: string): DashboardStats => {
  if (departmentId === 'all') {
    return mockDashboardStats;
  }
  
  const deptData = mockDepartmentData.find(d => d.department === departmentId);
  if (!deptData) {
    return { ...mockDashboardStats, totalIdle: 0, urgentCount: 0, availableNow: 0, assignedThisWeek: 0 };
  }
  
  return {
    ...mockDashboardStats,
    totalIdle: deptData.total,
    urgentCount: deptData.urgent,
    availableNow: deptData.available,
    assignedThisWeek: Math.max(0, deptData.total - deptData.available - deptData.urgent),
  };
};

export const getMockActivitiesForDepartment = (departmentId: string): Activity[] => {
  if (departmentId === 'all') {
    return mockRecentActivities;
  }
  
  // Filter activities by department context (simplified for mock)
  return mockRecentActivities.filter(activity => 
    activity.description.includes(departmentId) || 
    activity.userName.includes(departmentId) ||
    activity.action === 'system'
  );
};

// Mock data for dashboard statistics
export const MOCK_DASHBOARD_STATISTICS = {
  totalIdle: 45,
  urgentIdle: 12,
  availableNow: 23,
  assignedThisWeek: 10,
  departmentBreakdown: [
    { departmentId: 1, departmentName: 'IT', idleCount: 15, urgentCount: 4, percentage: 33.3 },
    { departmentId: 2, departmentName: 'QA', idleCount: 12, urgentCount: 3, percentage: 26.7 },
    { departmentId: 3, departmentName: 'DevOps', idleCount: 8, urgentCount: 2, percentage: 17.8 },
    { departmentId: 4, departmentName: 'UI/UX', idleCount: 6, urgentCount: 2, percentage: 13.3 },
    { departmentId: 5, departmentName: 'BA', idleCount: 4, urgentCount: 1, percentage: 8.9 },
  ],
  weeklyComparison: {
    currentWeek: 45,
    previousWeek: 38,
    changePercentage: 18.4,
    trend: 'up' as const,
  },
};

// Mock data for recent activities
export const MOCK_RECENT_ACTIVITIES = [
  {
    id: 1,
    actionType: 'UPDATE',
    description: 'RA updated resource #123 - Nguyen Van A status to Available',
    performedBy: 'RA User',
    performedAt: new Date('2025-01-10T10:30:00'),
    resourceName: 'Nguyen Van A',
    resourceId: 123,
  },
  {
    id: 2,
    actionType: 'CREATE',
    description: 'New resource added by Manager - Tran Thi B (IT Department)',
    performedBy: 'Manager IT',
    performedAt: new Date('2025-01-10T09:15:00'),
    resourceName: 'Tran Thi B',
    resourceId: 124,
  },
  {
    id: 3,
    actionType: 'DOWNLOAD',
    description: '5 CVs downloaded in bulk by Admin',
    performedBy: 'Admin User',
    performedAt: new Date('2025-01-10T08:45:00'),
  },
  {
    id: 4,
    actionType: 'IMPORT',
    description: 'System backup completed successfully',
    performedBy: 'System',
    performedAt: new Date('2025-01-10T07:00:00'),
  },
  {
    id: 5,
    actionType: 'UPDATE',
    description: 'Resource #120 moved to Assigned status by Manager QA',
    performedBy: 'Manager QA',
    performedAt: new Date('2025-01-09T16:20:00'),
    resourceName: 'Le Van C',
    resourceId: 120,
  },
];

// Mock data for quick actions stats
export const MOCK_QUICK_ACTION_STATS = {
  pendingImports: 2,
  scheduledReports: 3,
  activeUsers: 24,
  systemHealth: 'healthy' as const,
  lastSync: new Date('2025-01-10T10:30:00'),
};

// Chart data for department breakdown
export const MOCK_CHART_DATA = {
  departmentChart: {
    labels: ['IT', 'QA', 'DevOps', 'UI/UX', 'BA'],
    datasets: [
      {
        label: 'Idle Resources',
        data: [15, 12, 8, 6, 4],
        backgroundColor: [
          '#3f51b5',
          '#f44336',
          '#ff9800',
          '#4caf50',
          '#9c27b0',
        ],
        borderWidth: 1,
      },
    ],
  },
  weeklyTrendChart: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Idle Count',
        data: [32, 35, 38, 45],
        borderColor: '#3f51b5',
        backgroundColor: 'rgba(63, 81, 181, 0.1)',
        tension: 0.4,
      },
    ],
  },
};

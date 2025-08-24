export interface DashboardStatistics {
  totalIdle: number;
  urgentIdle: number;
  availableNow: number;
  assignedThisWeek: number;
  departmentBreakdown: DepartmentStat[];
  weeklyComparison: WeeklyComparison;
}

export interface DepartmentStat {
  departmentId: number;
  departmentName: string;
  idleCount: number;
  urgentCount: number;
  percentage: number;
}

export interface WeeklyComparison {
  currentWeek: number;
  previousWeek: number;
  changePercentage: number;
  trend: 'up' | 'down' | 'stable';
}

export interface RecentActivity {
  id: number;
  actionType: string;
  description: string;
  performedBy: string;
  performedAt: Date;
  resourceName?: string;
  resourceId?: number;
}

export interface DashboardFilters {
  departmentId?: string;
  fromDate?: string;
  toDate?: string;
  status?: string;
}

export interface QuickActionStats {
  pendingImports: number;
  scheduledReports: number;
  activeUsers: number;
  systemHealth: 'healthy' | 'warning' | 'error';
  lastSync: Date;
}

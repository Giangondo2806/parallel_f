export class DashboardStatsResponseDto {
  totalIdle: number;
  urgentCount: number;
  availableNow: number;
  assignedThisWeek: number;
  trend?: {
    totalChange: number;
    urgentChange: number;
    availableChange: number;
    assignedChange: number;
  };
  lastUpdated: Date;
}

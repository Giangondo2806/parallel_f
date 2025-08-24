export class RecentActivityResponseDto {
  id: number;
  action: string;
  description: string;
  userName: string;
  resourceName?: string;
  timestamp: Date;
  details?: Record<string, any>;
}

import {
  Controller,
  Get,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardFiltersDto } from './dto/dashboard-filters.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../entities/user.entity';
import { DepartmentAccessGuard } from '../auth/guards/department-access.guard';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { DashboardStatsResponseDto } from './dto/dashboard-stats-response.dto';
import { RecentActivityResponseDto } from './dto/recent-activity-response.dto';
import { DepartmentChartResponseDto } from './dto/department-chart-response.dto';

@Controller('dashboard')
@UseGuards(JwtAuthGuard, RolesGuard, DepartmentAccessGuard)
@UseInterceptors(LoggingInterceptor)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('statistics')
  @Roles(UserRole.ADMIN, UserRole.RA, UserRole.MANAGER, UserRole.VIEWER)
  async getDashboardStats(
    @Query() filters: DashboardFiltersDto,
  ): Promise<DashboardStatsResponseDto> {
    // TODO: This endpoint will be implemented by business logic phase
    // Delegate all logic to service - NO mock response here
    return await this.dashboardService.getStatistics(filters);
  }

  @Get('recent-activities')
  @Roles(UserRole.ADMIN, UserRole.RA, UserRole.MANAGER, UserRole.VIEWER)
  async getRecentActivities(
    @Query() query: PaginationDto,
  ): Promise<RecentActivityResponseDto[]> {
    // Service handles all logic - controller only delegates
    return await this.dashboardService.getRecentActivities(query);
  }

  @Get('department-charts')
  @Roles(UserRole.ADMIN, UserRole.RA, UserRole.MANAGER, UserRole.VIEWER)
  async getDepartmentCharts(
    @Query() filters: DashboardFiltersDto,
  ): Promise<DepartmentChartResponseDto> {
    // All chart data logic delegated to service
    return await this.dashboardService.getDepartmentCharts(filters);
  }

  @Get('quick-stats')
  @Roles(UserRole.ADMIN, UserRole.RA, UserRole.MANAGER, UserRole.VIEWER)
  async getQuickStats(
    @Query() filters: DashboardFiltersDto,
  ): Promise<any> {
    // Quick statistics for dashboard cards
    return await this.dashboardService.getQuickStats(filters);
  }

  @Get('refresh')
  @Roles(UserRole.ADMIN, UserRole.RA, UserRole.MANAGER, UserRole.VIEWER)
  async refreshDashboard(
    @Query() filters: DashboardFiltersDto,
  ): Promise<any> {
    // Full dashboard refresh endpoint
    return await this.dashboardService.refreshAllData(filters);
  }
}

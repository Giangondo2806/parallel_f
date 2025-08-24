import {
  Controller,
  Get,
  Query,
  UseGuards,
  Request,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardFiltersDto, PaginationDto } from './dto/dashboard.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../entities/user.entity';
import type { AuthenticatedRequest } from './interfaces/auth.interface';

@Controller('dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('statistics')
  @Roles(UserRole.ADMIN, UserRole.RA, UserRole.MANAGER, UserRole.VIEWER)
  async getDashboardStatistics(
    @Query() filters: DashboardFiltersDto,
    @Request() req: AuthenticatedRequest,
  ) {
    try {
      // Add user context to filters for role-based filtering
      const userFilters = {
        ...filters,
        userId: req.user.userId,
        userRole: req.user.role,
        userDepartmentId: req.user.departmentId,
      };

      return await this.dashboardService.getStatistics(userFilters);
    } catch (error) {
      console.error('Dashboard statistics error:', error);
      throw new HttpException(
        'Failed to retrieve dashboard statistics',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('recent-activities')
  @Roles(UserRole.ADMIN, UserRole.RA, UserRole.MANAGER, UserRole.VIEWER)
  async getRecentActivities(
    @Query() pagination: PaginationDto,
    @Query() filters: DashboardFiltersDto,
    @Request() req: AuthenticatedRequest,
  ) {
    try {
      // Add user context to filters for role-based filtering
      const userFilters = {
        ...filters,
        userId: req.user.userId,
        userRole: req.user.role,
        userDepartmentId: req.user.departmentId,
      };

      return await this.dashboardService.getRecentActivities(
        pagination,
        userFilters,
      );
    } catch (error) {
      console.error('Recent activities error:', error);
      throw new HttpException(
        'Failed to retrieve recent activities',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('department-breakdown')
  @Roles(UserRole.ADMIN, UserRole.RA, UserRole.MANAGER)
  async getDepartmentBreakdown(
    @Query() filters: DashboardFiltersDto,
    @Request() req: AuthenticatedRequest,
  ) {
    try {
      // Add user context to filters for role-based filtering
      const userFilters = {
        ...filters,
        userId: req.user.userId,
        userRole: req.user.role,
        userDepartmentId: req.user.departmentId,
      };

      return await this.dashboardService.getDepartmentBreakdown(userFilters);
    } catch (error) {
      console.error('Department breakdown error:', error);
      throw new HttpException(
        'Failed to retrieve department breakdown',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('weekly-comparison')
  @Roles(UserRole.ADMIN, UserRole.RA, UserRole.MANAGER)
  async getWeeklyComparison(
    @Query() filters: DashboardFiltersDto,
    @Request() req: AuthenticatedRequest,
  ) {
    try {
      // Add user context to filters for role-based filtering
      const userFilters = {
        ...filters,
        userId: req.user.userId,
        userRole: req.user.role,
        userDepartmentId: req.user.departmentId,
      };

      return await this.dashboardService.getWeeklyComparison(userFilters);
    } catch (error) {
      console.error('Weekly comparison error:', error);
      throw new HttpException(
        'Failed to retrieve weekly comparison',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('quick-actions')
  @Roles(UserRole.ADMIN, UserRole.RA, UserRole.MANAGER)
  async getQuickActionStats() {
    try {
      return await this.dashboardService.getQuickActionStats();
    } catch (error) {
      console.error('Quick action stats error:', error);
      throw new HttpException(
        'Failed to retrieve quick action statistics',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('refresh')
  @Roles(UserRole.ADMIN, UserRole.RA, UserRole.MANAGER, UserRole.VIEWER)
  async refreshDashboard(@Request() req: AuthenticatedRequest) {
    try {
      await this.dashboardService.refreshDashboardData(req.user.userId);
      return { message: 'Dashboard data refreshed successfully' };
    } catch (error) {
      console.error('Dashboard refresh error:', error);
      throw new HttpException(
        'Failed to refresh dashboard data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

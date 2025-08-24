import { IsOptional, IsString, IsDateString, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export class DashboardFiltersDto {
  @IsOptional()
  @IsString()
  departmentId?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsString()
  period?: 'week' | 'month' | 'quarter' | 'year';

  @IsOptional()
  @IsString()
  comparison?: 'previous' | 'last_year' | 'none';
}

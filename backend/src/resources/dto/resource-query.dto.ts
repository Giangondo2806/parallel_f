import {
  IsOptional,
  IsString,
  IsNumber,
  IsEnum,
  IsDateString,
  IsBoolean,
  IsArray,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ResourceStatus } from '../../entities/idle-resource.entity';

export class ResourceQueryDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  sortBy?: string = 'createdAt';

  @IsOptional()
  @IsString()
  sortOrder?: 'ASC' | 'DESC' = 'DESC';

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split(',').map(id => parseInt(id, 10));
    }
    return Array.isArray(value) ? value.map(id => parseInt(id, 10)) : [];
  })
  departmentIds?: number[];

  @IsOptional()
  @IsArray()
  @IsEnum(ResourceStatus, { each: true })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split(',');
    }
    return Array.isArray(value) ? value : [];
  })
  statuses?: ResourceStatus[];

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isUrgent?: boolean;

  @IsOptional()
  @IsDateString()
  idleFromStart?: string;

  @IsOptional()
  @IsDateString()
  idleFromEnd?: string;

  @IsOptional()
  @IsString()
  skillSet?: string;

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split(',');
    }
    return Array.isArray(value) ? value : [];
  })
  columns?: string[];
}

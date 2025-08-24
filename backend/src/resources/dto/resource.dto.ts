import { IsString, IsEmail, IsOptional, IsNumber, IsDateString, IsEnum, MaxLength, MinLength } from 'class-validator';
import { ResourceStatus } from '../../entities/idle-resource.entity';

export class CreateResourceDto {
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  employeeCode: string;

  @IsString()
  @MinLength(1)
  @MaxLength(100)
  fullName: string;

  @IsEmail()
  @MaxLength(100)
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  jobTitle?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  skillSet?: string;

  @IsNumber()
  departmentId: number;

  @IsDateString()
  idleFrom: string;

  @IsOptional()
  @IsDateString()
  idleTo?: string;

  @IsOptional()
  @IsEnum(ResourceStatus)
  status?: ResourceStatus;

  @IsOptional()
  @IsString()
  processNote?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  rate?: string;
}

export class UpdateResourceDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  employeeCode?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  fullName?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(100)
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  jobTitle?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  skillSet?: string;

  @IsOptional()
  @IsNumber()
  departmentId?: number;

  @IsOptional()
  @IsDateString()
  idleFrom?: string;

  @IsOptional()
  @IsDateString()
  idleTo?: string;

  @IsOptional()
  @IsEnum(ResourceStatus)
  status?: ResourceStatus;

  @IsOptional()
  @IsString()
  processNote?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  rate?: string;
}

export class ResourceResponseDto {
  resourceId: number;
  employeeCode: string;
  fullName: string;
  email: string;
  phone?: string;
  jobTitle?: string;
  skillSet?: string;
  departmentId: number;
  departmentName?: string;
  idleFrom: Date;
  idleTo?: Date;
  status: ResourceStatus;
  processNote?: string;
  rate?: string;
  isUrgent: boolean;
  idleDuration: number;
  createdBy: number;
  updatedBy: number;
  createdAt: Date;
  updatedAt: Date;
  cvFiles?: CVFileDto[];
}

export class CVFileDto {
  cvId: number;
  fileName: string;
  fileType: string;
  fileSize: number;
  uploadedBy: number;
  uploadedAt: Date;
}

export class ResourceQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsNumber()
  departmentId?: number;

  @IsOptional()
  @IsEnum(ResourceStatus)
  status?: ResourceStatus;

  @IsOptional()
  @IsDateString()
  idleFromStart?: string;

  @IsOptional()
  @IsDateString()
  idleFromEnd?: string;
}

export class DepartmentOptionDto {
  id: number;
  name: string;
}

export class FormOptionsDto {
  departments: DepartmentOptionDto[];
  statuses: Array<{ value: string; label: string }>;
  experienceLevels: Array<{ value: string; label: string }>;
}

import { IsString, IsEmail, IsOptional, IsEnum, IsDateString, IsNumber, IsBoolean, Length } from 'class-validator';
import { Type } from 'class-transformer';
import { ResourceStatus } from '../../entities/idle-resource.entity';

export class CreateResourceDto {
  @IsString()
  @Length(1, 20)
  employeeCode: string;

  @IsString()
  @Length(1, 100)
  fullName: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @Length(1, 20)
  phone?: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  jobTitle?: string;

  @IsOptional()
  @IsString()
  @Length(1, 200)
  skillSet?: string;

  @IsNumber()
  @Type(() => Number)
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
  @Length(1, 20)
  rate?: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isUrgent?: boolean;
}

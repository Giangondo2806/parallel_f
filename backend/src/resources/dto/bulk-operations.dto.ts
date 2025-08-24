import { IsArray, IsNumber, IsString, IsOptional, IsBoolean, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export class BulkDeleteDto {
  @IsArray()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  ids: number[];
}

export class ResourceImportDto {
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  skipDuplicates?: boolean = false;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  updateExisting?: boolean = false;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  departmentId?: number;
}

export class ResourceExportDto {
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  resourceIds?: number[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  columns?: string[];

  @IsOptional()
  @IsEnum(['csv', 'excel', 'pdf'])
  format?: 'csv' | 'excel' | 'pdf' = 'csv';

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  includeHeaders?: boolean = true;

  @IsOptional()
  @IsString()
  filename?: string;
}

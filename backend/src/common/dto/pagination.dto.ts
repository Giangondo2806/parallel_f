import { IsOptional, IsNumberString, IsPositive, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @IsNumberString()
  @Type(() => Number)
  @IsPositive()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsNumberString()
  @Type(() => Number)
  @IsPositive()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @IsOptional()
  @IsNumberString()
  @Type(() => Number)
  @Min(0)
  offset?: number;
}

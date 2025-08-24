import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UploadFileDto {
  @IsNumber()
  @IsNotEmpty()
  resourceId: number;

  @IsString()
  @IsOptional()
  description?: string;
}

export class FileUploadResponseDto {
  fileId: number;
  fileName: string;
  originalName: string;
  fileSize: number;
  mimeType: string;
  resourceId: number;
  uploadedByUserId: number;
  createdAt: Date;
  updatedAt: Date;
}

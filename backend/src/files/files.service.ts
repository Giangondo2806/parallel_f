import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CVFile, FileType } from '../entities/cv-file.entity';
import { UploadFileDto, FileUploadResponseDto } from './dto/upload-file.dto';
import {
  generateUniqueFilename,
  validateFileSize,
  getFileTypeFromExtension,
} from './file-upload.config';
import { promises as fs } from 'fs';
import { join } from 'path';
import { existsSync } from 'fs';

@Injectable()
export class FilesService {
  private readonly uploadPath = process.env.UPLOAD_PATH || './uploads';

  constructor(
    @InjectRepository(CVFile)
    private readonly cvFileRepository: Repository<CVFile>,
  ) {
    void this.ensureUploadDirectoryExists();
  }

  private async ensureUploadDirectoryExists(): Promise<void> {
    try {
      if (!existsSync(this.uploadPath)) {
        await fs.mkdir(this.uploadPath, { recursive: true });
      }
    } catch (error) {
      console.error('Failed to create upload directory:', error);
      throw new InternalServerErrorException(
        'Failed to initialize file storage',
      );
    }
  }

  private getFileTypeEnum(mimetype: string): FileType {
    switch (mimetype) {
      case 'application/pdf':
        return FileType.PDF;
      case 'application/msword':
        return FileType.DOC;
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return FileType.DOCX;
      case 'application/vnd.ms-excel':
        return FileType.XLS;
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        return FileType.XLSX;
      default:
        return FileType.PDF; // Default fallback
    }
  }

  async uploadFile(
    file: Express.Multer.File,
    uploadFileDto: UploadFileDto,
    uploadedByUserId: number,
  ): Promise<FileUploadResponseDto> {
    try {
      // Validate file size
      validateFileSize(file);

      // Generate unique filename
      const uniqueFilename = generateUniqueFilename(file.originalname);
      const filePath = join(this.uploadPath, uniqueFilename);

      // Save file to disk
      await fs.writeFile(filePath, file.buffer);

      // Determine file type
      const mimeType = file.mimetype || getFileTypeFromExtension(file.originalname);
      
      // Save file metadata to database
      const cvFile = this.cvFileRepository.create({
        fileName: uniqueFilename,
        filePath: uniqueFilename, // Store relative path
        fileType: this.getFileTypeEnum(mimeType),
        fileSize: file.size,
        resourceId: uploadFileDto.resourceId,
        uploadedBy: uploadedByUserId,
      });

      const savedFile = await this.cvFileRepository.save(cvFile);

      return {
        fileId: savedFile.cvId,
        fileName: savedFile.fileName,
        originalName: file.originalname,
        fileSize: savedFile.fileSize,
        mimeType,
        resourceId: savedFile.resourceId,
        uploadedByUserId: savedFile.uploadedBy,
        createdAt: savedFile.uploadedAt,
        updatedAt: savedFile.uploadedAt,
      };
    } catch (error) {
      console.error('File upload error:', error);
      
      if (error instanceof BadRequestException) {
        throw error;
      }
      
      throw new InternalServerErrorException('Failed to upload file');
    }
  }

  async downloadFile(fileId: number): Promise<{
    filePath: string;
    originalName: string;
    mimeType: string;
  }> {
    const cvFile = await this.cvFileRepository.findOne({
      where: { cvId: fileId },
    });

    if (!cvFile) {
      throw new NotFoundException(`File with ID ${fileId} not found`);
    }

    const fullFilePath = join(this.uploadPath, cvFile.fileName);

    // Check if file exists on disk
    if (!existsSync(fullFilePath)) {
      throw new NotFoundException('File not found on disk');
    }

    // Get mime type from file type enum
    let mimeType: string;
    switch (cvFile.fileType) {
      case FileType.PDF:
        mimeType = 'application/pdf';
        break;
      case FileType.DOC:
        mimeType = 'application/msword';
        break;
      case FileType.DOCX:
        mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        break;
      case FileType.XLS:
        mimeType = 'application/vnd.ms-excel';
        break;
      case FileType.XLSX:
        mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        break;
      default:
        mimeType = 'application/octet-stream';
    }

    return {
      filePath: fullFilePath,
      originalName: cvFile.fileName, // We'll need to store original name separately
      mimeType,
    };
  }

  async deleteFile(fileId: number, userId: number): Promise<void> {
    const cvFile = await this.cvFileRepository.findOne({
      where: { cvId: fileId },
    });

    if (!cvFile) {
      throw new NotFoundException(`File with ID ${fileId} not found`);
    }

    // Check if user has permission to delete this file
    // TODO: Add proper authorization logic here
    
    const filePath = join(this.uploadPath, cvFile.fileName);

    try {
      // Delete file from disk
      if (existsSync(filePath)) {
        await fs.unlink(filePath);
      }

      // Delete file metadata from database
      await this.cvFileRepository.delete(fileId);
    } catch (error) {
      console.error('File deletion error:', error);
      throw new InternalServerErrorException('Failed to delete file');
    }
  }

  async getFilesByResourceId(resourceId: number): Promise<CVFile[]> {
    return this.cvFileRepository.find({
      where: { resourceId },
      relations: ['uploadedByUser'],
      order: { uploadedAt: 'DESC' },
    });
  }

  async getFileInfo(fileId: number): Promise<CVFile> {
    const cvFile = await this.cvFileRepository.findOne({
      where: { cvId: fileId },
      relations: ['resource', 'uploadedByUser'],
    });

    if (!cvFile) {
      throw new NotFoundException(`File with ID ${fileId} not found`);
    }

    return cvFile;
  }

  async getFileStats(): Promise<{
    totalFiles: number;
    totalSize: number;
    averageSize: number;
  }> {
    const result = await this.cvFileRepository
      .createQueryBuilder('file')
      .select('COUNT(*)', 'totalFiles')
      .addSelect('SUM(file.fileSize)', 'totalSize')
      .addSelect('AVG(file.fileSize)', 'averageSize')
      .getRawOne();

    return {
      totalFiles: parseInt(result.totalFiles) || 0,
      totalSize: parseInt(result.totalSize) || 0,
      averageSize: parseFloat(result.averageSize) || 0,
    };
  }
}

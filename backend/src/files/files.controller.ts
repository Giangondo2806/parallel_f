import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
  Res,
  UseGuards,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response, Request as ExpressRequest } from 'express';
import { memoryStorage } from 'multer';
import { FilesService } from './files.service';
import { UploadFileDto, FileUploadResponseDto } from './dto/upload-file.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { DepartmentAccessGuard } from '../auth/guards/department-access.guard';
import { RequirePermissions } from '../auth/decorators/permissions.decorator';
import { Permission } from '../auth/permissions/permission.system';
import { multerConfig } from './file-upload.config';
import type { UserContext } from '../auth/interfaces/auth-response.interface';
import { User } from '../entities/user.entity';

interface AuthenticatedRequest extends ExpressRequest {
  user?: User;
  userContext?: UserContext;
}

@Controller('files')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @RequirePermissions(Permission.UPLOAD_FILE)
  @UseGuards(DepartmentAccessGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      ...multerConfig,
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadFileDto: UploadFileDto,
    @Request() req: AuthenticatedRequest,
  ): Promise<FileUploadResponseDto> {
    if (!req.user?.userId) {
      throw new Error('User not authenticated');
    }
    return this.filesService.uploadFile(file, uploadFileDto, req.user.userId);
  }

  @Get('download/:id')
  @RequirePermissions(Permission.DOWNLOAD_FILE)
  async downloadFile(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ): Promise<void> {
    const fileInfo = await this.filesService.downloadFile(id);

    res.setHeader('Content-Type', fileInfo.mimeType);
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${fileInfo.originalName}"`,
    );

    res.sendFile(fileInfo.filePath);
  }

  @Delete(':id')
  @RequirePermissions(Permission.DELETE_FILE)
  async deleteFile(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: AuthenticatedRequest,
  ): Promise<{ message: string }> {
    if (!req.user?.userId) {
      throw new Error('User not authenticated');
    }
    await this.filesService.deleteFile(id, req.user.userId);
    return { message: 'File deleted successfully' };
  }

  @Get('resource/:resourceId')
  @RequirePermissions(Permission.READ_RESOURCE)
  @UseGuards(DepartmentAccessGuard)
  async getFilesByResource(
    @Param('resourceId', ParseIntPipe) resourceId: number,
  ) {
    return this.filesService.getFilesByResourceId(resourceId);
  }

  @Get('info/:id')
  @RequirePermissions(Permission.READ_RESOURCE)
  async getFileInfo(@Param('id', ParseIntPipe) id: number) {
    return this.filesService.getFileInfo(id);
  }

  @Get('stats')
  @RequirePermissions(Permission.VIEW_STATS)
  async getFileStats() {
    return this.filesService.getFileStats();
  }
}

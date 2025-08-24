import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  ParseIntPipe,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RequirePermissions } from '../auth/decorators/permissions.decorator';
import { Permission } from '../auth/permissions/permission.system';
import { ResourcesService } from './resources.service';
import {
  CreateResourceDto,
  UpdateResourceDto,
  ResourceQueryDto,
  ResourceResponseDto,
  BulkDeleteDto,
  ResourceImportDto,
  ResourceExportDto,
} from './dto';

@Controller('resources')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Get()
  @RequirePermissions(Permission.READ_RESOURCE)
  async findAll(@Query() query: ResourceQueryDto): Promise<{
    data: ResourceResponseDto[];
    total: number;
    page: number;
    limit: number;
  }> {
    // Delegate all logic to service
    return await this.resourcesService.findAll(query);
  }

  @Get('search')
  @RequirePermissions(Permission.READ_RESOURCE)
  async search(@Query() query: ResourceQueryDto): Promise<{
    data: ResourceResponseDto[];
    total: number;
  }> {
    // Service handles search logic
    return await this.resourcesService.search(query);
  }

  @Get('filters')
  @RequirePermissions(Permission.READ_RESOURCE)
  async getFilterOptions(): Promise<{
    departments: Array<{ id: number; name: string }>;
    statuses: Array<{ value: string; label: string }>;
    skillSets: string[];
  }> {
    // Service handles filter data aggregation
    return await this.resourcesService.getFilterOptions();
  }

  @Get(':id')
  @RequirePermissions(Permission.READ_RESOURCE)
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResourceResponseDto> {
    // Service handles single resource retrieval
    return await this.resourcesService.findById(id);
  }

  @Post()
  @RequirePermissions(Permission.CREATE_RESOURCE)
  async create(
    @Body() createResourceDto: CreateResourceDto,
  ): Promise<ResourceResponseDto> {
    // Service handles resource creation logic
    return await this.resourcesService.create(createResourceDto);
  }

  @Put(':id')
  @RequirePermissions(Permission.UPDATE_RESOURCE)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateResourceDto: UpdateResourceDto,
  ): Promise<ResourceResponseDto> {
    // Service handles resource update logic
    return await this.resourcesService.update(id, updateResourceDto);
  }

  @Delete(':id')
  @RequirePermissions(Permission.DELETE_RESOURCE)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    // Service handles single resource deletion
    return await this.resourcesService.remove(id);
  }

  @Post('bulk-delete')
  @RequirePermissions(Permission.DELETE_RESOURCE)
  async bulkDelete(@Body() bulkDeleteDto: BulkDeleteDto): Promise<{
    deleted: number;
    failed: Array<{ id: number; reason: string }>;
  }> {
    // Service handles bulk deletion logic
    return await this.resourcesService.bulkDelete(bulkDeleteDto.ids);
  }

  @Post('bulk-update-status')
  @RequirePermissions(Permission.UPDATE_RESOURCE)
  async bulkUpdateStatus(@Body() data: {
    ids: number[];
    status: string;
  }): Promise<{
    updated: number;
    failed: Array<{ id: number; reason: string }>;
  }> {
    // Service handles bulk status update
    return await this.resourcesService.bulkUpdateStatus(data.ids, data.status);
  }

  @Post('import')
  @RequirePermissions(Permission.CREATE_RESOURCE)
  @UseInterceptors(FileInterceptor('file'))
  async importResources(
    @UploadedFile() file: Express.Multer.File,
    @Body() importDto: ResourceImportDto,
  ): Promise<{
    imported: number;
    failed: number;
    errors: Array<{ row: number; errors: string[] }>;
  }> {
    // Service handles file import processing
    return await this.resourcesService.importFromFile(file, importDto);
  }

  @Post('export')
  @RequirePermissions(Permission.EXPORT_DATA)
  async exportResources(
    @Body() exportDto: ResourceExportDto,
    @Res() res: Response,
  ): Promise<void> {
    // Service handles export logic and file generation
    return await this.resourcesService.exportToFile(exportDto, res);
  }

  @Get(':id/cv-files')
  @RequirePermissions(Permission.READ_RESOURCE)
  async getResourceCVFiles(@Param('id', ParseIntPipe) id: number): Promise<Array<{
    id: number;
    fileName: string;
    originalName: string;
    fileSize: number;
    uploadDate: Date;
  }>> {
    // Service handles CV file listing
    return await this.resourcesService.getResourceCVFiles(id);
  }

  @Post('bulk-download-cvs')
  @RequirePermissions(Permission.DOWNLOAD_FILE)
  async bulkDownloadCVs(
    @Body() data: { resourceIds: number[] },
    @Res() res: Response,
  ): Promise<void> {
    // Service handles bulk CV download as ZIP
    return await this.resourcesService.bulkDownloadCVs(data.resourceIds, res);
  }

  @Get('analytics/urgent-count')
  @RequirePermissions(Permission.READ_RESOURCE)
  async getUrgentResourcesCount(): Promise<{ count: number }> {
    // Service handles urgent resources calculation
    return await this.resourcesService.getUrgentResourcesCount();
  }

  @Get('analytics/by-department')
  @RequirePermissions(Permission.READ_RESOURCE)
  async getResourcesByDepartment(): Promise<Array<{
    departmentId: number;
    departmentName: string;
    total: number;
    urgent: number;
    available: number;
  }>> {
    // Service handles department analytics
    return await this.resourcesService.getResourcesByDepartment();
  }

  @Get('analytics/status-distribution')
  @RequirePermissions(Permission.READ_RESOURCE)
  async getStatusDistribution(): Promise<Array<{
    status: string;
    count: number;
    percentage: number;
  }>> {
    // Service handles status distribution analytics
    return await this.resourcesService.getStatusDistribution();
  }
}

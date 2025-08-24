import { ResourceStatus } from '../../entities/idle-resource.entity';

export class ResourceResponseDto {
  resourceId: number;
  employeeCode: string;
  fullName: string;
  email: string;
  phone?: string;
  jobTitle?: string;
  skillSet?: string;
  departmentId: number;
  departmentName: string;
  idleFrom: Date;
  idleTo?: Date;
  status: ResourceStatus;
  processNote?: string;
  rate?: string;
  isUrgent: boolean;
  createdBy: number;
  updatedBy: number;
  createdAt: Date;
  updatedAt: Date;
  cvFiles?: Array<{
    id: number;
    fileName: string;
    originalName: string;
    fileSize: number;
    uploadDate: Date;
  }>;
}

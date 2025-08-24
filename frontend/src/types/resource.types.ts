export enum ResourceStatus {
  AVAILABLE = 'Available',
  ASSIGNED = 'Assigned',
  ON_LEAVE = 'On Leave',
  TRAINING = 'Training',
}

export interface ResourceFormData {
  employeeCode: string;
  fullName: string;
  email: string;
  phone: string;
  jobTitle: string;
  skillSet: string;
  departmentId: number | '';
  idleFrom: string;
  idleTo: string;
  status: string;
  processNote: string;
  rate: string;
}

export interface CVFile {
  cvId: number;
  fileName: string;
  fileType: string;
  fileSize: number;
  uploadedAt: string;
}

export interface ResourceResponseDto {
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
  cvFiles?: CVFile[];
}

export interface DepartmentOption {
  id: number;
  name: string;
}

export interface StatusOption {
  value: string;
  label: string;
}

export interface FormOptions {
  departments: DepartmentOption[];
  statuses: StatusOption[];
  experienceLevels: Array<{ value: string; label: string }>;
}

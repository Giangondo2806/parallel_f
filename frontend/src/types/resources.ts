// Resource types for the frontend
export interface Resource {
  id: number;
  employeeCode: string;
  fullName: string;
  email: string;
  phone?: string;
  jobTitle?: string;
  skillSet?: string;
  departmentId: number;
  departmentName: string;
  idleFrom: string;
  idleTo?: string;
  status: ResourceStatus;
  processNote?: string;
  rate?: string;
  isUrgent: boolean;
  createdBy: number;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;
  cvFiles?: CVFile[];
}

export interface CVFile {
  id: number;
  fileName: string;
  originalName: string;
  fileSize: number;
  uploadDate: string;
}

export enum ResourceStatus {
  AVAILABLE = 'Available',
  ASSIGNED = 'Assigned',
  ON_LEAVE = 'On Leave',
  TRAINING = 'Training',
}

export interface Department {
  id: number;
  name: string;
}

export interface ResourceQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  departmentIds?: number[];
  statuses?: ResourceStatus[];
  isUrgent?: boolean;
  idleFromStart?: string;
  idleFromEnd?: string;
  skillSet?: string;
  columns?: string[];
}

export interface ResourceListResponse {
  data: Resource[];
  total: number;
  page: number;
  limit: number;
}

export interface FilterOptions {
  departments: Department[];
  statuses: Array<{ value: string; label: string }>;
  skillSets: string[];
}

export interface BulkOperationResult {
  success: number;
  failed: number;
  errors?: Array<{ id: number; reason: string }>;
}

export interface ImportResult {
  imported: number;
  failed: number;
  errors: Array<{ row: number; errors: string[] }>;
}

// Column visibility state
export interface ColumnVisibility {
  employeeCode: boolean;
  fullName: boolean;
  email: boolean;
  phone: boolean;
  jobTitle: boolean;
  skillSet: boolean;
  departmentName: boolean;
  idleFrom: boolean;
  status: boolean;
  rate: boolean;
  isUrgent: boolean;
  actions: boolean;
}

// Filter state
export interface ResourceFilters {
  departments: number[];
  statuses: string[];
  isUrgent: boolean | null;
  idleFromStart: string;
  idleFromEnd: string;
  skillSet: string;
}

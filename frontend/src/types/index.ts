// Base types and enums
export interface User {
  userId: number;
  username: string;
  email: string;
  fullName?: string;
  role: UserRole;
  isActive: boolean;
  departmentId?: number;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  department?: Department;
}

export enum UserRole {
  ADMIN = 'Admin',
  RA = 'RA',
  MANAGER = 'Manager',
  VIEWER = 'Viewer',
}

export interface Department {
  departmentId: number;
  departmentName: string;
  departmentCode: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Enhanced Idle Resource interface
export interface IdleResource {
  resourceId: number;
  employeeCode: string;
  fullName: string;
  email: string;
  phone?: string;
  jobTitle?: string;
  skillSet?: string;
  departmentId: number;
  department?: Department;
  idleFrom: Date;
  idleTo?: Date;
  status: ResourceStatus;
  processNote?: string;
  rate?: string;
  isUrgent: boolean;
  createdBy: number;
  updatedBy: number;
  createdByUser?: User;
  updatedByUser?: User;
  cvFiles?: CVFile[];
  createdAt: Date;
  updatedAt: Date;
}

export enum ResourceStatus {
  AVAILABLE = 'Available',
  ASSIGNED = 'Assigned',
  ON_LEAVE = 'On Leave',
  TRAINING = 'Training',
}

// CV File interface
export interface CVFile {
  cvId: number;
  resourceId: number;
  fileName: string;
  filePath: string;
  fileType: string;
  fileSize: number;
  uploadedBy: number;
  uploadedByUser?: User;
  uploadedAt: Date;
}

// Update History interface
export interface UpdateHistory {
  historyId: number;
  resourceId: number;
  resource?: IdleResource;
  tableName: string;
  actionType: HistoryAction;
  oldValues?: Record<string, any>;
  newValues?: Record<string, any>;
  changedBy: number;
  changedByUser?: User;
  changedAt: Date;
}

export enum HistoryAction {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  BULK_DELETE = 'BULK_DELETE',
  IMPORT = 'IMPORT',
  EXPORT = 'EXPORT',
  CV_UPLOAD = 'CV_UPLOAD',
  CV_DOWNLOAD = 'CV_DOWNLOAD',
  CV_DELETE = 'CV_DELETE',
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  statusCode: number;
  error: string;
  details?: any;
}

// Form and UI types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'multiselect' | 'checkbox' | 'radio' | 'date' | 'textarea';
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  helperText?: string;
  options?: Array<{ value: any; label: string; disabled?: boolean }>;
}

export interface TableColumn<T = any> {
  id: keyof T | string;
  label: string;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
}

export interface TableAction<T = any> {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: (selectedRows: T[]) => void;
  disabled?: (selectedRows: T[]) => boolean;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
}

// Dashboard and Reports
export interface DashboardStats {
  totalIdle: number;
  urgentIdle: number;
  availableResources: number;
  assignedThisWeek: number;
  byDepartment: Array<{
    department: string;
    count: number;
  }>;
  byStatus: Array<{
    status: string;
    count: number;
  }>;
  recentActivities: UpdateHistory[];
  lastUpdated: Date;
}

// Filter types
export interface BaseFilters {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface UserListFilters extends BaseFilters {
  role?: UserRole;
  departmentId?: number;
  isActive?: boolean;
}

export interface IdleResourceListFilters extends BaseFilters {
  departmentId?: number;
  status?: ResourceStatus;
  isUrgent?: boolean;
  idleFromStart?: Date;
  idleFromEnd?: Date;
}

export interface HistoryListFilters extends BaseFilters {
  resourceId?: number;
  actionType?: HistoryAction;
  changedBy?: number;
  dateFrom?: Date;
  dateTo?: Date;
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type Nullable<T> = T | null;
export type ID = string | number;

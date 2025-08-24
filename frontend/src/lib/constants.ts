// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',
    REFRESH: '/auth/refresh',
  },
  USERS: {
    LIST: '/users',
    CREATE: '/users',
    UPDATE: (id: number) => `/users/${id}`,
    DELETE: (id: number) => `/users/${id}`,
    BULK_DELETE: '/users/bulk-delete',
    IMPORT: '/users/import',
    EXPORT: '/users/export',
  },
  IDLE_RESOURCES: {
    LIST: '/idle-resources',
    CREATE: '/idle-resources',
    UPDATE: (id: number) => `/idle-resources/${id}`,
    DELETE: (id: number) => `/idle-resources/${id}`,
    BULK_DELETE: '/idle-resources/bulk-delete',
    IMPORT: '/idle-resources/import',
    EXPORT: '/idle-resources/export',
    DOWNLOAD_CV: (id: number) => `/idle-resources/${id}/cv/download`,
    DOWNLOAD_BULK_CV: '/idle-resources/cv/download-bulk',
  },
  DEPARTMENTS: {
    LIST: '/departments',
    CREATE: '/departments',
    UPDATE: (id: number) => `/departments/${id}`,
    DELETE: (id: number) => `/departments/${id}`,
  },
  FILES: {
    UPLOAD: '/files/upload',
    DOWNLOAD: (id: number) => `/files/${id}/download`,
    DELETE: (id: number) => `/files/${id}`,
  },
  HISTORY: {
    LIST: '/history',
    EXPORT: '/history/export',
  },
  REPORTS: {
    DASHBOARD: '/reports/dashboard',
    EXPORT: '/reports/export',
  },
} as const;

// User Roles
export const USER_ROLES = {
  ADMIN: 'Admin',
  RA: 'RA',
  MANAGER: 'Manager',
  VIEWER: 'Viewer',
} as const;

export const USER_ROLE_LABELS = {
  [USER_ROLES.ADMIN]: 'Administrator',
  [USER_ROLES.RA]: 'Resource Administrator',
  [USER_ROLES.MANAGER]: 'Department Manager',
  [USER_ROLES.VIEWER]: 'Viewer',
} as const;

export const USER_ROLE_COLORS = {
  [USER_ROLES.ADMIN]: 'error',
  [USER_ROLES.RA]: 'primary',
  [USER_ROLES.MANAGER]: 'warning',
  [USER_ROLES.VIEWER]: 'info',
} as const;

// Resource Status
export const RESOURCE_STATUS = {
  AVAILABLE: 'Available',
  ASSIGNED: 'Assigned',
  ON_LEAVE: 'On Leave',
  TRAINING: 'Training',
} as const;

export const RESOURCE_STATUS_LABELS = {
  [RESOURCE_STATUS.AVAILABLE]: 'Available',
  [RESOURCE_STATUS.ASSIGNED]: 'Assigned',
  [RESOURCE_STATUS.ON_LEAVE]: 'On Leave',
  [RESOURCE_STATUS.TRAINING]: 'Training',
} as const;

export const RESOURCE_STATUS_COLORS = {
  [RESOURCE_STATUS.AVAILABLE]: 'success',
  [RESOURCE_STATUS.ASSIGNED]: 'primary',
  [RESOURCE_STATUS.ON_LEAVE]: 'warning',
  [RESOURCE_STATUS.TRAINING]: 'info',
} as const;

// File Types
export const ALLOWED_FILE_TYPES = {
  CV: ['pdf', 'doc', 'docx'],
  IMPORT: ['csv', 'xlsx', 'xls'],
  IMAGES: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'],
} as const;

export const FILE_TYPE_LABELS = {
  pdf: 'PDF Document',
  doc: 'Word Document',
  docx: 'Word Document',
  csv: 'CSV File',
  xlsx: 'Excel File',
  xls: 'Excel File',
  jpg: 'JPEG Image',
  jpeg: 'JPEG Image',
  png: 'PNG Image',
  gif: 'GIF Image',
  bmp: 'Bitmap Image',
  webp: 'WebP Image',
} as const;

// File Size Limits (in bytes)
export const FILE_SIZE_LIMITS = {
  CV: 10 * 1024 * 1024, // 10MB
  IMPORT: 5 * 1024 * 1024, // 5MB
  IMAGE: 2 * 1024 * 1024, // 2MB
} as const;

// History Action Types
export const HISTORY_ACTIONS = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  BULK_DELETE: 'BULK_DELETE',
  IMPORT: 'IMPORT',
  EXPORT: 'EXPORT',
  CV_UPLOAD: 'CV_UPLOAD',
  CV_DOWNLOAD: 'CV_DOWNLOAD',
  CV_DELETE: 'CV_DELETE',
} as const;

export const HISTORY_ACTION_LABELS = {
  [HISTORY_ACTIONS.CREATE]: 'Created',
  [HISTORY_ACTIONS.UPDATE]: 'Updated',
  [HISTORY_ACTIONS.DELETE]: 'Deleted',
  [HISTORY_ACTIONS.BULK_DELETE]: 'Bulk Deleted',
  [HISTORY_ACTIONS.IMPORT]: 'Imported',
  [HISTORY_ACTIONS.EXPORT]: 'Exported',
  [HISTORY_ACTIONS.CV_UPLOAD]: 'CV Uploaded',
  [HISTORY_ACTIONS.CV_DOWNLOAD]: 'CV Downloaded',
  [HISTORY_ACTIONS.CV_DELETE]: 'CV Deleted',
} as const;

export const HISTORY_ACTION_COLORS = {
  [HISTORY_ACTIONS.CREATE]: 'success',
  [HISTORY_ACTIONS.UPDATE]: 'info',
  [HISTORY_ACTIONS.DELETE]: 'error',
  [HISTORY_ACTIONS.BULK_DELETE]: 'error',
  [HISTORY_ACTIONS.IMPORT]: 'primary',
  [HISTORY_ACTIONS.EXPORT]: 'secondary',
  [HISTORY_ACTIONS.CV_UPLOAD]: 'success',
  [HISTORY_ACTIONS.CV_DOWNLOAD]: 'info',
  [HISTORY_ACTIONS.CV_DELETE]: 'warning',
} as const;

// Navigation Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  USERS: '/dashboard/users',
  IDLE_RESOURCES: '/dashboard/idle-resources',
  RESOURCE_DETAIL: (id: number) => `/dashboard/idle-resources/${id}`,
  ADD_RESOURCE: '/dashboard/idle-resources/add',
  HISTORY: '/dashboard/history',
  REPORTS: '/dashboard/reports',
  SETTINGS: '/dashboard/settings',
} as const;

// Permission Constants
export const PERMISSIONS = {
  USERS: {
    VIEW: 'users:view',
    CREATE: 'users:create',
    UPDATE: 'users:update',
    DELETE: 'users:delete',
    IMPORT: 'users:import',
    EXPORT: 'users:export',
  },
  RESOURCES: {
    VIEW: 'resources:view',
    CREATE: 'resources:create',
    UPDATE: 'resources:update',
    DELETE: 'resources:delete',
    IMPORT: 'resources:import',
    EXPORT: 'resources:export',
    DOWNLOAD_CV: 'resources:download_cv',
  },
  HISTORY: {
    VIEW: 'history:view',
    EXPORT: 'history:export',
  },
  REPORTS: {
    VIEW: 'reports:view',
    EXPORT: 'reports:export',
  },
  SETTINGS: {
    VIEW: 'settings:view',
    UPDATE: 'settings:update',
  },
} as const;

// Role-based permissions mapping
export const ROLE_PERMISSIONS = {
  [USER_ROLES.ADMIN]: [
    ...Object.values(PERMISSIONS.USERS),
    ...Object.values(PERMISSIONS.RESOURCES),
    ...Object.values(PERMISSIONS.HISTORY),
    ...Object.values(PERMISSIONS.REPORTS),
    ...Object.values(PERMISSIONS.SETTINGS),
  ],
  [USER_ROLES.RA]: [
    PERMISSIONS.USERS.VIEW,
    ...Object.values(PERMISSIONS.RESOURCES),
    ...Object.values(PERMISSIONS.HISTORY),
    ...Object.values(PERMISSIONS.REPORTS),
    PERMISSIONS.SETTINGS.VIEW,
  ],
  [USER_ROLES.MANAGER]: [
    PERMISSIONS.USERS.VIEW,
    PERMISSIONS.RESOURCES.VIEW,
    PERMISSIONS.RESOURCES.CREATE,
    PERMISSIONS.RESOURCES.UPDATE,
    PERMISSIONS.RESOURCES.EXPORT,
    PERMISSIONS.RESOURCES.DOWNLOAD_CV,
    PERMISSIONS.HISTORY.VIEW,
    PERMISSIONS.REPORTS.VIEW,
    PERMISSIONS.REPORTS.EXPORT,
    PERMISSIONS.SETTINGS.VIEW,
  ],
  [USER_ROLES.VIEWER]: [
    PERMISSIONS.RESOURCES.VIEW,
    PERMISSIONS.HISTORY.VIEW,
    PERMISSIONS.REPORTS.VIEW,
    PERMISSIONS.SETTINGS.VIEW,
  ],
} as const;

// UI Constants
export const UI_CONSTANTS = {
  SIDEBAR_WIDTH: 280,
  HEADER_HEIGHT: 64,
  FOOTER_HEIGHT: 40,
  DRAWER_TRANSITION_DURATION: 300,
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  SEARCH_DEBOUNCE_MS: 300,
  NOTIFICATION_DURATION: 5000,
  URGENT_THRESHOLD_MONTHS: 2, // Resources idle for 2+ months are urgent
} as const;

// Validation Rules
export const VALIDATION_RULES = {
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 50,
    PATTERN: /^[a-zA-Z0-9_]+$/,
  },
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 128,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBER: true,
    REQUIRE_SPECIAL: true,
  },
  EMAIL: {
    MAX_LENGTH: 100,
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  PHONE: {
    MAX_LENGTH: 20,
    PATTERN: /^[\+]?[0-9\s\-\(\)]+$/,
  },
  EMPLOYEE_CODE: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 20,
    PATTERN: /^[A-Z0-9]+$/,
  },
  DEPARTMENT_CODE: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 10,
    PATTERN: /^[A-Z0-9]+$/,
  },
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access denied. Insufficient permissions.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SERVER_ERROR: 'An internal server error occurred. Please try again later.',
  FILE_TOO_LARGE: 'File size exceeds the maximum allowed limit.',
  INVALID_FILE_TYPE: 'Invalid file type. Please select a supported file format.',
  LOGIN_FAILED: 'Invalid username or password.',
  SESSION_EXPIRED: 'Your session has expired. Please log in again.',
  DUPLICATE_ENTRY: 'This entry already exists in the system.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Successfully logged in!',
  LOGOUT_SUCCESS: 'Successfully logged out!',
  CREATE_SUCCESS: 'Successfully created!',
  UPDATE_SUCCESS: 'Successfully updated!',
  DELETE_SUCCESS: 'Successfully deleted!',
  IMPORT_SUCCESS: 'Successfully imported!',
  EXPORT_SUCCESS: 'Successfully exported!',
  UPLOAD_SUCCESS: 'File uploaded successfully!',
  DOWNLOAD_SUCCESS: 'File downloaded successfully!',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth-token',
  USER_PREFERENCES: 'user-preferences',
  THEME_MODE: 'theme-mode',
  SIDEBAR_STATE: 'sidebar-state',
  TABLE_SETTINGS: 'table-settings',
  FORM_DRAFTS: 'form-drafts',
} as const;

// Main Components exports

// Common components
export { default as AuthGuard } from './common/AuthGuard';
export { default as ErrorBoundary } from './common/ErrorBoundary';
export { NotificationProvider } from './common/NotificationProvider';
export { default as Providers } from './providers';

// Layout components
export { default as DashboardLayout } from './layout/DashboardLayout';

// Dashboard components
export { DashboardStatsCards } from './dashboard/DashboardStatsCards';
export { DepartmentBreakdown } from './dashboard/DepartmentBreakdown';
export { RecentActivities } from './dashboard/RecentActivities';
export { QuickActions } from './dashboard/QuickActions';
export { default as Header } from './layout/Header';
export { default as Sidebar } from './layout/Sidebar';
export { default as Footer } from './layout/Footer';

// UI components
export * from './ui';

// Form components
export * from './forms';

// Chart components
export * from './charts';

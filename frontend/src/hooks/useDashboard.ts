// Dashboard React Hook - BC001 Implementation
// Custom hook for dashboard data management
// Provides state management and API integration for dashboard components

import { useState, useEffect, useCallback } from 'react';
import { 
  dashboardService, 
  DashboardStats, 
  Activity, 
  DepartmentData,
  DashboardFilters,
  PaginationParams 
} from '../lib/services/dashboard.service';

interface UseDashboardState {
  stats: DashboardStats | null;
  activities: Activity[];
  departmentData: DepartmentData[];
  quickStats: any;
  loading: boolean;
  error: string | null;
  lastRefresh: Date | null;
}

interface UseDashboardReturn extends UseDashboardState {
  refreshStats: (filters?: DashboardFilters) => Promise<void>;
  refreshActivities: (params?: PaginationParams) => Promise<void>;
  refreshDepartmentData: (filters?: DashboardFilters) => Promise<void>;
  refreshAll: (filters?: DashboardFilters) => Promise<void>;
  clearError: () => void;
}

export function useDashboard(initialFilters: DashboardFilters = {}): UseDashboardReturn {
  const [state, setState] = useState<UseDashboardState>({
    stats: null,
    activities: [],
    departmentData: [],
    quickStats: null,
    loading: false,
    error: null,
    lastRefresh: null,
  });

  const [currentFilters, setCurrentFilters] = useState<DashboardFilters>(initialFilters);

  // Load dashboard statistics
  const refreshStats = useCallback(async (filters: DashboardFilters = currentFilters) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const stats = await dashboardService.getStatistics(filters);
      
      setState(prev => ({
        ...prev,
        stats,
        loading: false,
        lastRefresh: new Date(),
      }));
      
      setCurrentFilters(filters);
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to load dashboard statistics',
      }));
    }
  }, [currentFilters]);

  // Load recent activities
  const refreshActivities = useCallback(async (params: PaginationParams = { page: 1, limit: 10 }) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const activities = await dashboardService.getRecentActivities(params);
      
      setState(prev => ({
        ...prev,
        activities,
        loading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to load recent activities',
      }));
    }
  }, []);

  // Load department chart data
  const refreshDepartmentData = useCallback(async (filters: DashboardFilters = currentFilters) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const departmentData = await dashboardService.getDepartmentCharts(filters);
      
      setState(prev => ({
        ...prev,
        departmentData,
        loading: false,
      }));
      
      setCurrentFilters(filters);
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to load department data',
      }));
    }
  }, [currentFilters]);

  // Refresh all dashboard data
  const refreshAll = useCallback(async (filters: DashboardFilters = currentFilters) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      // Load all data in parallel for better performance
      const [stats, activities, departmentData, quickStats] = await Promise.all([
        dashboardService.getStatistics(filters),
        dashboardService.getRecentActivities({ page: 1, limit: 10 }),
        dashboardService.getDepartmentCharts(filters),
        dashboardService.getQuickStats(filters),
      ]);

      setState(prev => ({
        ...prev,
        stats,
        activities,
        departmentData,
        quickStats,
        loading: false,
        lastRefresh: new Date(),
      }));

      setCurrentFilters(filters);

      // TODO: Trigger refresh notification for user
      console.log('Dashboard refreshed successfully');
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to refresh dashboard',
      }));
    }
  }, [currentFilters]);

  // Clear error state
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Initial data load on mount
  useEffect(() => {
    refreshAll(initialFilters);
  }, []); // Only run on mount

  return {
    ...state,
    refreshStats,
    refreshActivities,
    refreshDepartmentData,
    refreshAll,
    clearError,
  };
}

// TODO: Add additional hooks for business logic implementation
// export function useDashboardWithAuth() - for authenticated dashboard access
// export function useDashboardRealtime() - for real-time dashboard updates
// export function useDashboardPermissions() - for role-based dashboard filtering

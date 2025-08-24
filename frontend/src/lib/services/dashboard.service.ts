// Dashboard API Service - BC001 Implementation
// This service provides the interface for dashboard API calls
// Currently uses mock data, will be replaced with real API calls in business logic phase

import { 
  DashboardStats, 
  Activity, 
  DepartmentData,
  mockDashboardStats,
  mockRecentActivities,
  mockDepartmentData,
  getMockStatsForDepartment,
  getMockActivitiesForDepartment
} from '../mock-data/dashboard';

export interface DashboardFilters {
  departmentId?: string;
  startDate?: string;
  endDate?: string;
  period?: 'week' | 'month' | 'quarter' | 'year';
  comparison?: 'previous' | 'last_year' | 'none';
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
}

class DashboardService {
  // TODO: Replace with real API endpoint when implementing business logic
  private readonly baseUrl = '/api/dashboard';

  async getStatistics(filters: DashboardFilters = {}): Promise<DashboardStats> {
    // TODO: Implement real API call
    // const response = await fetch(`${this.baseUrl}/statistics`, {
    //   method: 'GET',
    //   headers: { 'Content-Type': 'application/json' },
    //   credentials: 'include',
    // });
    // return response.json();

    // Mock implementation for BC001 base coding
    await this.simulateApiDelay();
    return getMockStatsForDepartment(filters.departmentId || 'all');
  }

  async getRecentActivities(params: PaginationParams = {}): Promise<Activity[]> {
    // TODO: Implement real API call with pagination
    // const queryParams = new URLSearchParams({
    //   page: params.page?.toString() || '1',
    //   limit: params.limit?.toString() || '10',
    // });
    // const response = await fetch(`${this.baseUrl}/recent-activities?${queryParams}`);
    // return response.json();

    // Mock implementation for BC001 base coding
    await this.simulateApiDelay();
    const { page = 1, limit = 10 } = params;
    const start = (page - 1) * limit;
    const end = start + limit;
    return mockRecentActivities.slice(start, end);
  }

  async getDepartmentCharts(filters: DashboardFilters = {}): Promise<DepartmentData[]> {
    // TODO: Implement real API call
    // const response = await fetch(`${this.baseUrl}/department-charts`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(filters),
    //   credentials: 'include',
    // });
    // return response.json();

    // Mock implementation for BC001 base coding
    await this.simulateApiDelay();
    if (filters.departmentId && filters.departmentId !== 'all') {
      return mockDepartmentData.filter(d => d.department === filters.departmentId);
    }
    return mockDepartmentData;
  }

  async getQuickStats(filters: DashboardFilters = {}): Promise<any> {
    // TODO: Implement real API call for quick stats
    // const response = await fetch(`${this.baseUrl}/quick-stats`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(filters),
    //   credentials: 'include',
    // });
    // return response.json();

    // Mock implementation for BC001 base coding
    await this.simulateApiDelay();
    return {
      systemHealth: 'good',
      lastSync: new Date(),
      onlineUsers: 12,
      pendingActions: 3,
    };
  }

  async refreshAllData(filters: DashboardFilters = {}): Promise<any> {
    // TODO: Implement real API call for full dashboard refresh
    // const response = await fetch(`${this.baseUrl}/refresh`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(filters),
    //   credentials: 'include',
    // });
    // return response.json();

    // Mock implementation for BC001 base coding
    await this.simulateApiDelay(1000); // Simulate longer refresh time
    return {
      success: true,
      timestamp: new Date(),
      refreshedComponents: ['statistics', 'activities', 'charts', 'quick-stats'],
    };
  }

  // Utility method to simulate API delay for realistic mock behavior
  private async simulateApiDelay(ms: number = 300): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // TODO: Add error handling methods for business logic implementation
  // private handleApiError(error: any): never {
  //   console.error('Dashboard API Error:', error);
  //   throw new Error('Failed to load dashboard data');
  // }

  // TODO: Add authentication headers when auth system is implemented
  // private getAuthHeaders(): Record<string, string> {
  //   const token = localStorage.getItem('authToken');
  //   return token ? { Authorization: `Bearer ${token}` } : {};
  // }
}

// Export singleton instance
export const dashboardService = new DashboardService();

// Export types for use in components
export type { DashboardStats, Activity, DepartmentData };

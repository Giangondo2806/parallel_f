import { useState, useEffect, useCallback } from 'react';
import {
  Resource,
  ResourceQueryParams,
  ResourceListResponse,
  FilterOptions,
  ResourceFilters,
} from '../types/resources';
import { ResourcesAPI } from '../services/resources-api';

// Mock data for development
const MOCK_RESOURCES = [
  {
    id: 1,
    employeeCode: 'EMP001',
    fullName: 'Nguyen Van A',
    email: 'nguyen.a@fjp.com',
    phone: '+84901234567',
    jobTitle: 'Senior Developer',
    skillSet: 'Java, Spring Boot, React',
    departmentId: 1,
    departmentName: 'IT Development',
    idleFrom: '2025-01-06',
    idleTo: '',
    status: 'Available' as any,
    rate: '$500/day',
    isUrgent: true,
    processNote: 'Looking for new project assignment',
    createdBy: 1,
    updatedBy: 1,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
    cvFiles: [{ id: 1, fileName: 'CV_Nguyen_A.pdf', originalName: 'CV_Nguyen_A.pdf', fileSize: 1024, uploadDate: '2025-01-01' }],
  },
  {
    id: 2,
    employeeCode: 'EMP002',
    fullName: 'Tran Thi B',
    email: 'tran.b@fjp.com',
    phone: '+84901234568',
    jobTitle: 'QA Engineer',
    skillSet: 'Testing, Automation, Selenium',
    departmentId: 2,
    departmentName: 'Quality Assurance',
    idleFrom: '2025-07-15',
    idleTo: '',
    status: 'Available' as any,
    rate: '$400/day',
    isUrgent: false,
    processNote: 'Available for testing projects',
    createdBy: 1,
    updatedBy: 1,
    createdAt: '2025-01-05',
    updatedAt: '2025-01-05',
    cvFiles: [{ id: 2, fileName: 'CV_Tran_B.pdf', originalName: 'CV_Tran_B.pdf', fileSize: 1024, uploadDate: '2025-01-05' }],
  },
  {
    id: 3,
    employeeCode: 'EMP003',
    fullName: 'Le Van C',
    email: 'le.c@fjp.com',
    phone: '+84901234569',
    jobTitle: 'Business Analyst',
    skillSet: 'Requirements Analysis, Documentation',
    departmentId: 3,
    departmentName: 'Business Analysis',
    idleFrom: '2024-11-01',
    idleTo: '',
    status: 'Available' as any,
    rate: '$450/day',
    isUrgent: true,
    processNote: 'Completed last project, ready for new assignment',
    createdBy: 1,
    updatedBy: 1,
    createdAt: '2024-12-20',
    updatedAt: '2024-12-20',
    cvFiles: [],
  },
  {
    id: 4,
    employeeCode: 'EMP004',
    fullName: 'Pham Thi D',
    email: 'pham.d@fjp.com',
    phone: '+84901234570',
    jobTitle: 'UI/UX Designer',
    skillSet: 'Figma, Adobe XD, Sketch',
    departmentId: 4,
    departmentName: 'Design',
    idleFrom: '2025-02-01',
    idleTo: '',
    status: 'On Leave' as any,
    rate: '$350/day',
    isUrgent: false,
    processNote: 'On personal leave until end of month',
    createdBy: 1,
    updatedBy: 1,
    createdAt: '2025-01-15',
    updatedAt: '2025-01-15',
    cvFiles: [{ id: 3, fileName: 'CV_Pham_D.pdf', originalName: 'CV_Pham_D.pdf', fileSize: 1024, uploadDate: '2025-01-15' }],
  },
  {
    id: 5,
    employeeCode: 'EMP005',
    fullName: 'Hoang Van E',
    email: 'hoang.e@fjp.com',
    phone: '+84901234571',
    jobTitle: 'DevOps Engineer',
    skillSet: 'Docker, Kubernetes, AWS',
    departmentId: 1,
    departmentName: 'IT Development',
    idleFrom: '2025-03-01',
    idleTo: '',
    status: 'Training' as any,
    rate: '$600/day',
    isUrgent: false,
    processNote: 'Currently in cloud certification training',
    createdBy: 1,
    updatedBy: 1,
    createdAt: '2025-02-28',
    updatedAt: '2025-02-28',
    cvFiles: [],
  },
];

const MOCK_FILTER_OPTIONS: FilterOptions = {
  departments: [
    { id: 1, name: 'IT Development' },
    { id: 2, name: 'Quality Assurance' },
    { id: 3, name: 'Business Analysis' },
    { id: 4, name: 'Design' },
  ],
  statuses: [
    { value: 'Available', label: 'Available' },
    { value: 'Assigned', label: 'Assigned' },
    { value: 'On Leave', label: 'On Leave' },
    { value: 'Training', label: 'Training' },
  ],
  skillSets: [
    'Java', 'Spring Boot', 'React', 'Testing', 'Automation', 'Selenium',
    'Requirements Analysis', 'Documentation', 'Figma', 'Adobe XD', 'Sketch',
    'Docker', 'Kubernetes', 'AWS'
  ],
};

export function useResources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(MOCK_FILTER_OPTIONS);

  // Load resources with query parameters
  const loadResources = useCallback(async (params: ResourceQueryParams = {}) => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API call when backend is ready
      // const response = await ResourcesAPI.getResources(params);
      // setResources(response.data);
      // setTotalCount(response.total);

      // For now, use mock data with basic filtering
      let filteredResources = [...MOCK_RESOURCES];

      // Apply search filter
      if (params.search) {
        const searchLower = params.search.toLowerCase();
        filteredResources = filteredResources.filter(resource =>
          resource.fullName.toLowerCase().includes(searchLower) ||
          resource.email.toLowerCase().includes(searchLower) ||
          resource.employeeCode.toLowerCase().includes(searchLower) ||
          resource.skillSet?.toLowerCase().includes(searchLower) ||
          resource.departmentName.toLowerCase().includes(searchLower)
        );
      }

      // Apply department filter
      if (params.departmentIds && params.departmentIds.length > 0) {
        filteredResources = filteredResources.filter(resource =>
          params.departmentIds!.includes(resource.departmentId)
        );
      }

      // Apply status filter
      if (params.statuses && params.statuses.length > 0) {
        filteredResources = filteredResources.filter(resource =>
          params.statuses!.includes(resource.status as any)
        );
      }

      // Apply urgent filter
      if (params.isUrgent !== undefined && params.isUrgent !== null) {
        filteredResources = filteredResources.filter(resource =>
          resource.isUrgent === params.isUrgent
        );
      }

      // Apply date range filters
      if (params.idleFromStart) {
        filteredResources = filteredResources.filter(resource =>
          resource.idleFrom >= params.idleFromStart!
        );
      }
      if (params.idleFromEnd) {
        filteredResources = filteredResources.filter(resource =>
          resource.idleFrom <= params.idleFromEnd!
        );
      }

      // Apply sorting
      if (params.sortBy) {
        filteredResources.sort((a, b) => {
          const aValue = (a as any)[params.sortBy!];
          const bValue = (b as any)[params.sortBy!];
          
          const result = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
          return params.sortOrder === 'DESC' ? -result : result;
        });
      }

      // Apply pagination
      const page = params.page || 1;
      const limit = params.limit || 25;
      const startIndex = (page - 1) * limit;
      const paginatedResources = filteredResources.slice(startIndex, startIndex + limit);

      setResources(paginatedResources);
      setTotalCount(filteredResources.length);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

    } catch (err) {
      console.error('Error loading resources:', err);
      setError(err instanceof Error ? err.message : 'Failed to load resources');
    } finally {
      setLoading(false);
    }
  }, []);

  // Search resources
  const searchResources = useCallback(async (query: string) => {
    if (!query.trim()) {
      return loadResources();
    }
    return loadResources({ search: query });
  }, [loadResources]);

  // Delete resource
  const deleteResource = useCallback(async (id: number) => {
    try {
      // TODO: Replace with actual API call
      // await ResourcesAPI.deleteResource(id);
      
      // For mock implementation, remove from local state
      setResources(prev => prev.filter(resource => resource.id !== id));
      setTotalCount(prev => prev - 1);
      
      console.log('Mock: Deleted resource', id);
    } catch (err) {
      console.error('Error deleting resource:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete resource');
    }
  }, []);

  // Bulk delete resources
  const bulkDeleteResources = useCallback(async (ids: number[]) => {
    try {
      // TODO: Replace with actual API call
      // const result = await ResourcesAPI.bulkDeleteResources(ids);
      
      // For mock implementation, remove from local state
      setResources(prev => prev.filter(resource => !ids.includes(resource.id)));
      setTotalCount(prev => prev - ids.length);
      
      console.log('Mock: Bulk deleted resources', ids);
      return { success: ids.length, failed: 0 };
    } catch (err) {
      console.error('Error bulk deleting resources:', err);
      setError(err instanceof Error ? err.message : 'Failed to bulk delete resources');
      throw err;
    }
  }, []);

  // Bulk update status
  const bulkUpdateStatus = useCallback(async (ids: number[], status: string) => {
    try {
      // TODO: Replace with actual API call
      // const result = await ResourcesAPI.bulkUpdateStatus(ids, status);
      
      // For mock implementation, update local state
      setResources(prev => prev.map(resource =>
        ids.includes(resource.id)
          ? { ...resource, status: status as any }
          : resource
      ));
      
      console.log('Mock: Bulk updated status', ids, status);
      return { success: ids.length, failed: 0 };
    } catch (err) {
      console.error('Error bulk updating status:', err);
      setError(err instanceof Error ? err.message : 'Failed to bulk update status');
      throw err;
    }
  }, []);

  // Load filter options
  const loadFilterOptions = useCallback(async () => {
    try {
      // TODO: Replace with actual API call
      // const options = await ResourcesAPI.getFilterOptions();
      // setFilterOptions(options);
      
      // Using mock data for now
      setFilterOptions(MOCK_FILTER_OPTIONS);
    } catch (err) {
      console.error('Error loading filter options:', err);
    }
  }, []);

  // Initialize data on mount
  useEffect(() => {
    loadResources();
    loadFilterOptions();
  }, [loadResources, loadFilterOptions]);

  return {
    resources,
    loading,
    error,
    totalCount,
    filterOptions,
    loadResources,
    searchResources,
    deleteResource,
    bulkDeleteResources,
    bulkUpdateStatus,
    setError,
  };
}

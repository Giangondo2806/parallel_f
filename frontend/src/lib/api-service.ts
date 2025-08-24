import api, { ApiResponse } from './api';
import { AxiosResponse } from 'axios';

// Generic API service functions
export class ApiService {
  /**
   * Generic GET request
   */
  static async get<T>(url: string, params?: Record<string, any>): Promise<T> {
    const response: AxiosResponse<ApiResponse<T> | T> = await api.get(url, { params });
    
    // Handle both wrapped (ApiResponse<T>) and unwrapped (T) responses
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
      // Wrapped response format: { success, statusCode, message, data, timestamp }
      return (response.data as ApiResponse<T>).data;
    } else {
      // Direct response format
      return response.data as T;
    }
  }

  /**
   * Generic POST request
   */
  static async post<T>(url: string, data?: any): Promise<T> {
    const response: AxiosResponse<ApiResponse<T> | T> = await api.post(url, data);
    
    // Handle both wrapped (ApiResponse<T>) and unwrapped (T) responses
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
      // Wrapped response format: { success, statusCode, message, data, timestamp }
      return (response.data as ApiResponse<T>).data;
    } else {
      // Direct response format
      return response.data as T;
    }
  }

  /**
   * Generic PUT request
   */
  static async put<T>(url: string, data?: any): Promise<T> {
    const response: AxiosResponse<ApiResponse<T> | T> = await api.put(url, data);
    
    // Handle both wrapped (ApiResponse<T>) and unwrapped (T) responses
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
      // Wrapped response format: { success, statusCode, message, data, timestamp }
      return (response.data as ApiResponse<T>).data;
    } else {
      // Direct response format
      return response.data as T;
    }
  }

  /**
   * Generic PATCH request
   */
  static async patch<T>(url: string, data?: any): Promise<T> {
    const response: AxiosResponse<ApiResponse<T> | T> = await api.patch(url, data);
    
    // Handle both wrapped (ApiResponse<T>) and unwrapped (T) responses
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
      // Wrapped response format: { success, statusCode, message, data, timestamp }
      return (response.data as ApiResponse<T>).data;
    } else {
      // Direct response format
      return response.data as T;
    }
  }

  /**
   * Generic DELETE request
   */
  static async delete<T>(url: string): Promise<T> {
    const response: AxiosResponse<ApiResponse<T> | T> = await api.delete(url);
    
    // Handle both wrapped (ApiResponse<T>) and unwrapped (T) responses
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
      // Wrapped response format: { success, statusCode, message, data, timestamp }
      return (response.data as ApiResponse<T>).data;
    } else {
      // Direct response format
      return response.data as T;
    }
  }

  /**
   * File upload request
   */
  static async uploadFile<T>(url: string, file: File, onProgress?: (progress: number) => void): Promise<T> {
    const formData = new FormData();
    formData.append('file', file);

    const response: AxiosResponse<ApiResponse<T>> = await api.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(progress);
        }
      },
    });

    return response.data.data;
  }

  /**
   * Download file request
   */
  static async downloadFile(url: string, filename?: string): Promise<void> {
    const response = await api.get(url, {
      responseType: 'blob',
    });

    // Create blob link to download
    const blob = new Blob([response.data]);
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    
    // Extract filename from response headers or use provided filename
    const contentDisposition = response.headers['content-disposition'];
    const extractedFilename = contentDisposition?.split('filename=')[1]?.replace(/"/g, '');
    link.download = filename || extractedFilename || 'download';
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(link.href);
  }
}

export default ApiService;

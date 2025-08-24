import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Types for API responses
export interface ApiResponse<T = any> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  timestamp: string;
}

export interface ApiError {
  success: false;
  statusCode: number;
  message: string | string[];
  error: string;
  timestamp: string;
  path: string;
  method: string;
}

// Create axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token management with cookie support
const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    // First check localStorage (for remember me), then sessionStorage, then cookies
    const localToken = localStorage.getItem('token');
    const sessionToken = sessionStorage.getItem('token');
    const cookieToken = getCookieValue('auth-token');
    
    return localToken || sessionToken || cookieToken;
  }
  return null;
};

// Helper function to get cookie value
const getCookieValue = (name: string): string | null => {
  if (typeof window === 'undefined') return null;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
};

const setToken = (token: string, remember = false): void => {
  if (typeof window !== 'undefined') {
    const isSecure = location.protocol === 'https:';
    
    if (remember) {
      localStorage.setItem('token', token);
      sessionStorage.removeItem('token');
      // Set cookie for 30 days for remember me
      const cookieOptions = `auth-token=${token}; path=/; max-age=${30 * 24 * 60 * 60}; SameSite=Lax${isSecure ? '; Secure' : ''}`;
      document.cookie = cookieOptions;
    } else {
      sessionStorage.setItem('token', token);
      localStorage.removeItem('token');
      // Set session cookie (expires when browser closes) - use SameSite=Lax for localhost
      const cookieOptions = `auth-token=${token}; path=/; SameSite=Lax${isSecure ? '; Secure' : ''}`;
      document.cookie = cookieOptions;
    }
  }
};

const removeToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    // Remove cookie with same settings as when we set it
    document.cookie = 'auth-token=; path=/; max-age=0; SameSite=Lax';
  }
};

// Request interceptor for authentication
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    return response;
  },
  (error: AxiosError<ApiError>) => {
    // Handle specific error cases
    if (error.response) {
      const { status } = error.response;
      
      switch (status) {
        case 401:
          // Unauthorized - remove token but let components handle redirect
          removeToken();
          break;
      }
    }

    return Promise.reject(error);
  }
);

// Export API client and utilities
export { setToken, removeToken, getToken, getCookieValue };
export default api;

import ApiService from './api-service';
import { setToken, removeToken, getToken } from './api';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: {
    userId: number;
    username: string;
    email: string;
    fullName?: string;
    role: string;
    isActive: boolean;
    departmentId?: number;
    department?: {
      departmentId: number;
      departmentName: string;
    };
  };
}

export interface RefreshTokenResponse {
  access_token: string;
}

export class AuthService {
  /**
   * Login user
   */
  static async login(credentials: LoginRequest, remember: boolean = false): Promise<LoginResponse> {
    const response = await ApiService.post<LoginResponse>('/auth/login', credentials);
    
    // Store token
    setToken(response.access_token, remember);
    
    return response;
  }

  /**
   * Logout user
   */
  static async logout(): Promise<void> {
    try {
      await ApiService.post('/auth/logout');
    } catch (error) {
      // Continue with logout even if API call fails
      console.warn('Logout API call failed:', error);
    } finally {
      // Always remove token from storage
      removeToken();
    }
  }

  /**
   * Get current user profile
   */
  static async getProfile(): Promise<LoginResponse['user']> {
    return ApiService.get<LoginResponse['user']>('/auth/profile');
  }

  /**
   * Refresh authentication token
   */
  static async refreshToken(): Promise<RefreshTokenResponse> {
    const response = await ApiService.post<RefreshTokenResponse>('/auth/refresh');
    
    // Update stored token
    const currentToken = getToken();
    if (currentToken) {
      const remember = localStorage.getItem('token') !== null;
      setToken(response.access_token, remember);
    }
    
    return response;
  }

  /**
   * Get user permissions
   */
  static async getPermissions(): Promise<{ permissions: string[] }> {
    return ApiService.get<{ permissions: string[] }>('/auth/permissions');
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated(): boolean {
    return getToken() !== null;
  }

  /**
   * Get stored token
   */
  static getStoredToken(): string | null {
    return getToken();
  }
}

export default AuthService;

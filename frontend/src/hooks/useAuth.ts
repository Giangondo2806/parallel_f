'use client';

import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AuthService, { LoginRequest, LoginResponse } from '../lib/auth-service';
import { useNotification } from '../components/common/NotificationProvider';
import { useApiErrorHandler } from './useApiErrorHandler';

export interface UseAuthReturn {
  user: LoginResponse['user'] | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest, remember?: boolean) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  isLoginLoading: boolean;
  isLogoutLoading: boolean;
}

export const useAuth = (): UseAuthReturn => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const queryClient = useQueryClient();
  const { showError, showSuccess } = useNotification();
  const { getErrorMessage } = useApiErrorHandler();

    // Check authentication status on mount
  useEffect(() => {
    const checkAuth = () => {
      const hasToken = AuthService.isAuthenticated();
      setIsAuthenticated(hasToken);
      setIsInitialized(true);
    };
    
    checkAuth();
  }, []);

    // Get user profile query
  const {
    data: user,
    isLoading,
    error: profileError,
  } = useQuery({
    queryKey: ['auth', 'profile'],
    queryFn: AuthService.getProfile,
    enabled: isAuthenticated && isInitialized,
    retry: false,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

    // Handle profile fetch errors - but don't immediately reset auth
  useEffect(() => {
    if (profileError) {
      // Re-check if token still exists after potential removal by interceptor
      const hasToken = AuthService.isAuthenticated();
      const isUnauthorized = (profileError as any)?.response?.status === 401;
      
      if (isUnauthorized || !hasToken) {
        setIsAuthenticated(false);
        queryClient.clear();
      }
    }
  }, [profileError, queryClient]);

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: ({ credentials, remember }: { credentials: LoginRequest; remember: boolean }) => 
      AuthService.login(credentials, remember),
    onSuccess: (data) => {
      setIsAuthenticated(true);
      queryClient.setQueryData(['auth', 'profile'], data.user);
      showSuccess('Login successful');
    },
    onError: (error) => {
      showError(getErrorMessage(error));
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: AuthService.logout,
    onSuccess: () => {
      setIsAuthenticated(false);
      queryClient.clear();
      showSuccess('Logged out successfully');
    },
    onError: (error) => {
      // Still clear local state even if logout API fails
      setIsAuthenticated(false);
      queryClient.clear();
      showError(getErrorMessage(error));
    },
  });

  // Refresh token mutation
  const refreshTokenMutation = useMutation({
    mutationFn: AuthService.refreshToken,
    onError: (error) => {
      console.error('Token refresh failed:', error);
      setIsAuthenticated(false);
      queryClient.clear();
    },
  });

  const login = useCallback(async (credentials: LoginRequest, remember: boolean = false) => {
    await loginMutation.mutateAsync({ credentials, remember });
  }, [loginMutation]);

  const logout = useCallback(async () => {
    await logoutMutation.mutateAsync();
  }, [logoutMutation]);

  const refreshToken = useCallback(async () => {
    await refreshTokenMutation.mutateAsync();
  }, [refreshTokenMutation]);

  return {
    user: user || null,
    isAuthenticated,
    isLoading: !isInitialized || isLoading, // Include initialization state
    login,
    logout,
    refreshToken,
    isLoginLoading: loginMutation.isPending,
    isLogoutLoading: logoutMutation.isPending,
  };
};

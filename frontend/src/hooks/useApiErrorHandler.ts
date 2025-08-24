'use client';

import { useCallback } from 'react';
import { AxiosError } from 'axios';
import { ApiError } from '../lib/api';

export interface UseApiErrorHandlerReturn {
  handleError: (error: unknown) => ApiError | null;
  getErrorMessage: (error: unknown) => string;
  isApiError: (error: unknown) => error is AxiosError<ApiError>;
}

export const useApiErrorHandler = (): UseApiErrorHandlerReturn => {
  const isApiError = useCallback((error: unknown): error is AxiosError<ApiError> => {
    return (error as AxiosError)?.isAxiosError === true;
  }, []);

  const handleError = useCallback((error: unknown): ApiError | null => {
    console.error('API Error:', error);

    if (isApiError(error) && error.response?.data) {
      return error.response.data;
    }

    return null;
  }, [isApiError]);

  const getErrorMessage = useCallback((error: unknown): string => {
    if (isApiError(error) && error.response?.data) {
      const { message } = error.response.data;
      
      if (Array.isArray(message)) {
        return message.join(', ');
      }
      
      return message || 'An error occurred';
    }

    if (error instanceof Error) {
      return error.message;
    }

    return 'An unexpected error occurred';
  }, [isApiError]);

  return {
    handleError,
    getErrorMessage,
    isApiError,
  };
};

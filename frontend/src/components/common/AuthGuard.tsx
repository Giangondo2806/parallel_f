'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import Loading from './Loading';
import { getToken } from '../../lib/api';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean; // true for protected routes, false for public routes
  redirectTo?: string; // where to redirect if auth requirement not met
}

export const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  requireAuth = true,
  redirectTo,
}) => {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const [isClientInitialized, setIsClientInitialized] = useState(false);

  // Check client-side token immediately
  useEffect(() => {
    setIsClientInitialized(true);
  }, []);

  useEffect(() => {
    // Only redirect after both client and auth hook are initialized
    if (!isLoading && isClientInitialized) {
      const hasToken = !!getToken();
      
      if (requireAuth && !isAuthenticated && !hasToken) {
        // User should be authenticated but isn't - redirect to login
        router.replace(redirectTo || '/login');
      } else if (!requireAuth && (isAuthenticated || hasToken)) {
        // User shouldn't be on this page (e.g., login page when already logged in)
        router.replace(redirectTo || '/dashboard');
      }
    }
  }, [isAuthenticated, isLoading, requireAuth, redirectTo, router, isClientInitialized]);

  // Show loading while checking authentication
  if (isLoading || !isClientInitialized) {
    return <Loading />;
  }

  // For protected routes, check if user has token even if useAuth isn't ready yet
  if (requireAuth) {
    const hasToken = !!getToken();
    if (!isAuthenticated && !hasToken) {
      return null; // Will redirect above
    }
  }

  // For public routes, check if user should not be here
  if (!requireAuth) {
    const hasToken = !!getToken();
    if (isAuthenticated || hasToken) {
      return null; // Will redirect above
    }
  }

  return <>{children}</>;
};

export default AuthGuard;

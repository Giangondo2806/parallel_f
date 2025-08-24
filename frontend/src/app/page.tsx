'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.replace('/dashboard');
      } else {
        router.replace('/login');
      }
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading while determining auth status
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Fallback content (should rarely be seen due to redirects)
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          FJP - IRMS
        </h1>
        <p className="text-gray-600 mb-6">
          Hệ thống Quản lý Idle Resource
        </p>
        <div className="space-x-4">
          <button
            onClick={() => router.push('/login')}
            className="argon-button-gradient px-6 py-3 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
          >
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
}

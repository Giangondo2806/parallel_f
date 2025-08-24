'use client';

import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import AuthGuard from '../../components/common/AuthGuard';

interface DashboardLayoutWrapperProps {
  children: React.ReactNode;
}

export default function DashboardLayoutWrapper({ children }: DashboardLayoutWrapperProps) {
  return (
    <AuthGuard requireAuth={true} redirectTo="/login">
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </AuthGuard>
  );
}

'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ResultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, triageResult } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
    } else if (!triageResult) {
      router.replace('/triage');
    }
  }, [isAuthenticated, triageResult, router]);

  if (!isAuthenticated || !triageResult) {
    return null;
  }

  return <>{children}</>;
}

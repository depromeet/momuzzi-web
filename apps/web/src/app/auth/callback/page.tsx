'use client';

import { Suspense, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useAuthParams } from '@/app/auth/_hooks/useAuthParams';
import Loading from '@/components/ui/Loading';
import { exchangeCodeForCookie } from '@/services/auth';

// 유효한 리다이렉트 경로인지 확인 (Open Redirect 공격 방지)
const isValidRedirectUrl = (url: string | null): boolean => {
  if (!url) return false;
  if (!url.startsWith('/')) return false;

  const validPaths = ['/events', '/survey', '/meetings'];
  return validPaths.some((path) => url.startsWith(path));
};

const CallbackContent = () => {
  const { code, error, state } = useAuthParams();

  const router = useRouter();

  useEffect(() => {
    const processAuth = async () => {
      if (error) {
        console.error('OAuth 실패:', error);
        router.replace('/login');
        return;
      }

      if (!code) {
        console.error('code 파라미터 없음');
        router.replace('/login');
        return;
      }

      try {
        await exchangeCodeForCookie(code);

        // 유효한 redirectUrl이면 해당 경로로, 아니면 홈으로
        const redirectUrl = isValidRedirectUrl(state) ? (state as string) : '/';
        router.replace(redirectUrl);
      } catch (error) {
        console.error('로그인 실패:', error);
        router.replace('/login');
      }
    };

    processAuth();
  }, [code, error, state, router]);

  return <Loading />;
};

const CallbackPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <CallbackContent />
    </Suspense>
  );
};

export default CallbackPage;

'use client';

import Image from 'next/image';

import { cn } from '@/lib/cn';

const PROVIDER_CONFIG = {
  kakao: {
    text: '카카오톡으로 시작하기',
    icon: '/icons/kakao-icon.svg',
    className: 'bg-yellow-400',
  },
};

interface LoginButtonProps {
  provider?: 'kakao';
  redirectTo?: string | null;
}

const LoginButton = ({ provider = 'kakao', redirectTo }: LoginButtonProps) => {
  const config = PROVIDER_CONFIG[provider];

  const handleLogin = async () => {
    try {
      const params = new URLSearchParams();
      if (redirectTo) {
        params.append('state', redirectTo);
      }
      const queryString = params.toString();
      const apiUrl = `/api/auth/kakao${queryString ? `?${queryString}` : ''}`;

      const response = await fetch(apiUrl);
      if (!response.ok) {
        const error = await response.json();
        console.error('Failed to get Kakao auth URL:', error);
        return;
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <button
      type="button"
      aria-label={config.text}
      onClick={handleLogin}
      className={cn(
        'flex h-[62px] w-full cursor-pointer items-center justify-center gap-2 rounded-[14px] p-[10px] body-3 font-semibold transition-all duration-200',
        config.className
      )}
    >
      <Image src={config.icon} alt={`${provider} 아이콘`} width={24} height={24} />
      {config.text}
    </button>
  );
};

export default LoginButton;

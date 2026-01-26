import Image from 'next/image';

import LoginButton from '@/app/login/_components/LoginButton';

const LoginPage = async ({ searchParams }: { searchParams: Promise<{ redirectTo?: string }> }) => {
  const { redirectTo } = await searchParams;

  return (
    <div className="flex h-[100dvh] w-full flex-col items-center gathering-card">
      <div className="flex w-full max-w-[375px] flex-1 items-center justify-center">
        <main className="flex flex-col items-center gap-4">
          <Image
            src={'/images/ssolv-wordmark.svg'}
            alt="Ssolv 워드마크 아이콘"
            width={183}
            height={68}
            priority
          />
          <p className="body-3 text-neutral-1200">바로 추천받는 우리 모임의 식당</p>
        </main>
      </div>

      <div className="w-full px-5 pb-14">
        <LoginButton redirectTo={redirectTo} />
      </div>
    </div>
  );
};

export default LoginPage;

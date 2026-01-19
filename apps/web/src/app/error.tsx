'use client';

import Image from 'next/image';
import Link from 'next/link';

import Button from '@/components/ui/Button';

const ErrorBoundary = ({ reset }: { reset: () => void }) => {
  return (
    <main className="flex h-[100dvh] flex-col select-none">
      <div className="flex flex-1 flex-col items-center justify-center gap-5">
        <Image
          src="/images/momuzzi-not-found.svg"
          alt="모무찌 404 아이콘"
          width={180}
          height={120}
        />
        <div className="flex flex-col gap-1 text-center">
          <h3 className="body-1 font-semibold text-neutral-1600">문제가 생겼어요.</h3>
          <p className="body-3 whitespace-pre text-neutral-800">
            {`아래 버튼을 눌러 홈으로 돌아가거나\n페이지를 새로고침해보세요.`}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 px-5 pt-3 pb-6">
        <Button onClick={reset}>새로고침</Button>
        <Link href="/">
          <Button theme="gray">홈으로 가기</Button>
        </Link>
      </div>
    </main>
  );
};

export default ErrorBoundary;

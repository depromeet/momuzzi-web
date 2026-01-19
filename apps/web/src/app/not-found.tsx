import Image from 'next/image';
import Link from 'next/link';

import Button from '@/components/ui/Button';

const NotFoundPage = () => {
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
          <h3 className="body-1 font-semibold text-neutral-1600">
            찾으시는 페이지를 찾을 수 없어요.
          </h3>
          <p className="body-3 whitespace-pre text-neutral-800">
            {`페이지 주소가 바뀌었거나, 잠시 접근이 어려운 상태예요.\n홈으로 돌아가 다시 시작해보세요.`}
          </p>
        </div>
      </div>
      <Link href="/" className="px-5 pt-3 pb-6">
        <Button>홈으로 가기</Button>
      </Link>
    </main>
  );
};

export default NotFoundPage;

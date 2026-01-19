import Image from 'next/image';

const EMPTY_MESSAGE = `아직 진행 중인 식당 추천이 없어요
모임을 생성하고 식당을 추천받아보세요`;

const EmptyActiveMeetingCard = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 rounded-3xl px-3 py-5 gathering-card">
      <Image src="/images/momuzzi-home.svg" alt="모무찌 홈 대표 로고" width={60} height={60} />
      <p className="text-center body-3 leading-6 font-medium whitespace-pre text-neutral-1100">
        {EMPTY_MESSAGE}
      </p>
    </div>
  );
};

export default EmptyActiveMeetingCard;

'use client';

import Link from 'next/link';

import Button from '@/app/_components/ui/Button';
import { cn } from '@/app/_lib/cn';
import { ADDITIONAL_RESTAURANT_COUNT } from '@/app/events/[eventId]/_constants/restaurants';
import { useRestaurantPickCount } from '@/app/events/[eventId]/_hooks/useRestaurantPickCount';

interface MorePicksButtonProps {
  showHomeButton?: boolean;
}
const MorePicksButton = ({ showHomeButton = false }: MorePicksButtonProps) => {
  const { increasePickCount, canLoadMore } = useRestaurantPickCount();

  return (
    <div className={cn('sticky bottom-0 flex gap-3 px-5 py-3', !canLoadMore && 'hidden')}>
      {showHomeButton && (
        <Link href="/">
          <Button type="button" theme="gray" className="w-fit px-9 py-5">
            홈으로
          </Button>
        </Link>
      )}
      <Button className="flex-1" onClick={increasePickCount}>
        {ADDITIONAL_RESTAURANT_COUNT}개 더 추천받기
      </Button>
    </div>
  );
};

export default MorePicksButton;

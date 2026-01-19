'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useRestaurantPickCount } from '@/app/events/[eventId]/_hooks/useRestaurantPickCount';
import TopNavigation from '@/components/layout/TopNavigation';

const RestaurantsNavigation = ({ eventId }: { eventId: string }) => {
  const router = useRouter();

  const { isDefaultCount, getUrlWithPicks } = useRestaurantPickCount();

  const analysisUrl = getUrlWithPicks(`/events/${eventId}/analysis`);

  const goToAnalysis = () => {
    router.replace(analysisUrl);
  };

  useEffect(() => {
    if (isDefaultCount) {
      router.prefetch(analysisUrl);
    }
  }, [analysisUrl, isDefaultCount, router]);

  return (
    <TopNavigation
      showBackButton
      className="text-white"
      title="추천 결과"
      onLeftClick={goToAnalysis}
    />
  );
};

export default RestaurantsNavigation;

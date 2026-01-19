'use client';

import RestaurantCardContent from '@/app/events/[eventId]/_components/RestaurantCardContent';
import { RecommendedPlace } from '@/services/place';

interface RestaurantCardProps {
  restaurant: RecommendedPlace;
  rank?: number;
}
const RestaurantCard = ({ restaurant, rank }: RestaurantCardProps) => {
  const hasRank = rank !== undefined;

  return (
    <div className="flex w-full flex-col gap-2 p-5">
      {hasRank && (
        <div className="flex items-center gap-2">
          <span className="flex h-4 w-4 items-center justify-center rounded-sm bg-orange-500 label-2 font-semibold text-white">
            {rank}
          </span>
          <span className="label-1 font-semibold text-orange-600">모임원 Pick!</span>
        </div>
      )}

      <RestaurantCardContent theme="lightCompact" place={restaurant} imagePriority={hasRank} />
    </div>
  );
};

export default RestaurantCard;

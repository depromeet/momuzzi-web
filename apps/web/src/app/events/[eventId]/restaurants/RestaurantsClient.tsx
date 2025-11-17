'use client';

import { useEffect, useMemo, useRef } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { ApiError } from '@/app/_models/api';
import { getPlacesQueryOptions } from '@/app/_queries/placeQueries';
import { RecommendedPlaceResponse } from '@/app/_services/place';
import MorePicksButton from '@/app/events/[eventId]/_components/MorePicksButton';
import { TOP_RESTAURANT_COUNT } from '@/app/events/[eventId]/_constants/restaurants';
import { useRestaurantPickCount } from '@/app/events/[eventId]/_hooks/useRestaurantPickCount';
import RestaurantCard from '@/app/events/[eventId]/restaurants/_components/RestaurantCard';
import RestaurantsSwiper from '@/app/events/[eventId]/restaurants/_components/RestaurantSwiper';

const NAVIGATION_HEIGHT = '3.5rem';

const RestaurantsClient = () => {
  const params = useParams();
  const { eventId: meetingId } = params;

  const { pickCount } = useRestaurantPickCount();

  const prevPicksRef = useRef(pickCount);
  const cardRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const { data: restaurants } = useQuery<RecommendedPlaceResponse, ApiError>({
    ...getPlacesQueryOptions(Number(meetingId)),
  });

  useEffect(() => {
    const prevPickCount = prevPicksRef.current;

    if (pickCount > prevPickCount) {
      const newFirstIndex = prevPickCount;
      const targetCard = cardRefs.current[newFirstIndex - TOP_RESTAURANT_COUNT];

      if (targetCard) {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    prevPicksRef.current = pickCount;
  }, [pickCount]);

  const top3Restaurants = useMemo(
    () => restaurants?.items.slice(0, TOP_RESTAURANT_COUNT),
    [restaurants]
  );
  const otherRestaurants = useMemo(
    () => restaurants?.items.slice(TOP_RESTAURANT_COUNT, pickCount),
    [restaurants, pickCount]
  );

  return (
    <div className="flex flex-col">
      <RestaurantsSwiper restaurants={top3Restaurants || []} />

      <div className="flex flex-col bg-white">
        {otherRestaurants?.map((restaurant, index) => {
          const rank = index + TOP_RESTAURANT_COUNT + 1; // 4부터 시작
          const isTop4 = rank <= 4; // 4번째 이하인지 여부

          return (
            <div
              key={restaurant.placeId}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              style={{ scrollMarginTop: NAVIGATION_HEIGHT }}
            >
              <RestaurantCard restaurant={restaurant} rank={isTop4 ? rank : undefined} />
            </div>
          );
        })}

        <MorePicksButton />
      </div>
    </div>
  );
};

export default RestaurantsClient;

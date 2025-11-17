'use client';
import { useEffect, useRef, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import useEmblaCarousel from 'embla-carousel-react';
import { ListIcon } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { cn } from '@/app/_lib/cn';
import { ApiError } from '@/app/_models/api';
import { getPlacesQueryOptions } from '@/app/_queries/placeQueries';
import { RecommendedPlaceResponse } from '@/app/_services/place';
import { useRestaurantPickCount } from '@/app/events/[eventId]/_hooks/useRestaurantPickCount';
import RestaurantCard from '@/app/events/[eventId]/analysis/_components/RestaurantCard';

const RestaurantCardSwiper = () => {
  const params = useParams();
  const { eventId: meetingId } = params;

  const { data: placesData } = useQuery<RecommendedPlaceResponse, ApiError>({
    ...getPlacesQueryOptions(Number(meetingId)),
  });

  const places = placesData?.items || [];

  const { pickCount, getUrlWithPicks } = useRestaurantPickCount();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const prevPicksRef = useRef(pickCount);

  const totalPicks = Math.min(pickCount, places.length);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    const prevPicks = prevPicksRef.current; //이동 할 카드 타겟 인덱스

    if (!emblaApi) return;

    if (pickCount > prevPicks) {
      const timeout = setTimeout(() => {
        emblaApi.scrollTo(prevPicks);
      }, 500); // 500ms 후에 스크롤 이동(딜레이를 주어 애니메이션 효과를 줌,딜레이를 주지 않으면 카드가 즉시 이동해버림)
      prevPicksRef.current = pickCount;

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [emblaApi, pickCount]); // picks 변동이 발생할때, picks가 이전 보다 많아 질때 실행

  return (
    <div className="flex w-full flex-col gap-5 pt-4 pb-10">
      <div className="flex w-full items-center justify-between px-5">
        <div className="flex gap-2 body-3 font-semibold">
          <span className="text-white">{`${selectedIndex ? selectedIndex + 1 : 1}`}</span>
          <span className="text-neutral-600">/</span>
          <span className="text-neutral-600">{totalPicks}</span>
        </div>
        <Link
          href={getUrlWithPicks(`/events/${meetingId}/restaurants`)}
          replace={true}
          prefetch={true}
          className="flex h-8 items-center gap-1 rounded-full border border-white-alpha-3 bg-white-alpha-2 pr-3 pl-2"
        >
          <ListIcon className="h-4 w-4 text-white" />
          <span className="label-2 font-semibold text-white">리스트 보기</span>
        </Link>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="pan-y flex w-full">
          {places.slice(0, pickCount).map((place, index) => (
            <div
              key={place.placeId}
              className={cn(
                'min ml-1.5 h-[131.7vw] max-h-[623px] flex-[0_0_85%] [transform:translate3d(0,0,0)] overflow-hidden rounded-2xl',
                index === 0 && 'ml-5',
                index === pickCount - 1 && 'mr-5'
              )}
            >
              <RestaurantCard place={place} index={index} isActive={selectedIndex === index} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantCardSwiper;

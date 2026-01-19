'use client';

import { useState } from 'react';

import { EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import PickRankBadge from '@/app/events/[eventId]/_components/PickRankBadge';
import RestaurantCardContent from '@/app/events/[eventId]/_components/RestaurantCardContent';
import { cn } from '@/lib/cn';
import { RecommendedPlace } from '@/services/place';

import 'swiper/css';
import 'swiper/css/effect-coverflow';

interface RestaurantsSwiperProps {
  restaurants: RecommendedPlace[];
}

const RestaurantsSwiper = ({ restaurants }: RestaurantsSwiperProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="overscroll-y-hidden h-[494px] w-full px-4">
      <Swiper
        effect="coverflow"
        direction="vertical"
        modules={[EffectCoverflow]}
        grabCursor={true}
        slidesPerView={1}
        centeredSlidesBounds
        coverflowEffect={{
          rotate: 0, // Y축 회전 각도
          stretch: 182, // 카드 간격 (px)
          depth: 35, // 원근감 (z축)
          modifier: 2.5, // 강도
          slideShadows: false, // 그림자 여부
        }}
        resistanceRatio={0}
        touchReleaseOnEdges={true}
        className="h-full w-full"
        onActiveIndexChange={(swiper) => {
          setActiveIndex(swiper.activeIndex);
        }}
      >
        {restaurants.map((restaurant, index) => (
          <SwiperSlide key={restaurant.placeId} className="!flex !items-center !justify-center">
            <div
              className={cn(
                'relative flex h-fit w-full flex-col gap-3 overflow-hidden rounded-3xl bg-white pt-3 pb-5 shadow-xl'
              )}
            >
              <div
                className={cn(
                  'pointer-events-none absolute inset-0 z-20 rounded-3xl transition-opacity',
                  activeIndex !== index ? 'bg-black/40 opacity-100' : 'opacity-0'
                )}
              />
              <div className="z-10 flex flex-col gap-3">
                <PickRankBadge rank={index + 1} />
                <RestaurantCardContent
                  place={restaurant}
                  theme="lightCompact"
                  imagePriority={index === 0}
                  className="px-3"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RestaurantsSwiper;

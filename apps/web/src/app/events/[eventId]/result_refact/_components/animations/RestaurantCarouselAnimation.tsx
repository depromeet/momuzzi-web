'use client';
import { useState } from 'react';

import { motion } from 'framer-motion';
import { EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import RestaurantCarouselCard from '@/app/events/[eventId]/result_refact/_components/RestaurantCarouselCard';
import { Restaurant } from '@/app/events/[eventId]/result_refact/_models/result';
import TopNavigation from '@/components/layout/TopNavigation';
import { cn } from '@/lib/cn';

import 'swiper/css';
import 'swiper/css/effect-coverflow';

interface RestaurantCarouselProps {
  restaurants: Restaurant[];
}
export const RestaurantCarousel = ({ restaurants }: RestaurantCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1, ease: 'easeInOut' }}
      className={cn('flex w-full flex-1 flex-col background-2')}
    >
      <TopNavigation title="추천 결과" showBackButton />
      <h1 className="z-10 type-gradient px-5 pt-4 pb-6 text-start heading-3 font-bold">
        가장 많은 모임원이 선택한
        <br /> 한식당이에요.
      </h1>
      <Swiper
        effect="coverflow"
        modules={[EffectCoverflow]}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1} // ← auto
        centeredSlidesBounds // auto 폭을 기준으로 정확히 중앙 보정
        initialSlide={1}
        coverflowEffect={{
          rotate: 0, // Y축 회전 각도
          stretch: 70, // 카드 간격 (px)
          depth: 100, // 원근감 (z축)
          modifier: 2.5, // 강도
          slideShadows: false, // 그림자 여부
        }}
        className="w-full"
        onActiveIndexChange={(swiper) => {
          setActiveIndex(swiper.activeIndex);
        }}
      >
        {restaurants.map((restaurant, index) => {
          return (
            <SwiperSlide key={restaurant.id} className="pb-9">
              <RestaurantCarouselCard
                key={restaurant.id}
                restaurant={restaurant}
                index={index}
                isActive={activeIndex === index}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </motion.div>
  );
};

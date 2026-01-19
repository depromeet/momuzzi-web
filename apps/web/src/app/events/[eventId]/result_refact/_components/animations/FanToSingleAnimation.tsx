'use client';

import { useEffect, useMemo, useState } from 'react';

import { motion } from 'framer-motion';

import FanCard from '@/app/events/[eventId]/result_refact/_components/RestaurantCard';
import { Restaurant } from '@/app/events/[eventId]/result_refact/_models/result';
import TopNavigation from '@/components/layout/TopNavigation';

const ANGLE_STEP = 15; // 부채꼴 각도 간격(도)
const FAN_SPREAD = 120; // 부채꼴 가로 벌어짐(px)
const STACK_STEP_Y = 10; // 모일 때 위로 살짝 겹치기(px)

interface TransitionAnimationProps {
  restaurants: Restaurant[];
  onComplete: () => void;
}

const FanToSingleAnimation = ({ restaurants, onComplete }: TransitionAnimationProps) => {
  const [animationPhase, setAnimationPhase] = useState<'fan' | 'stacked' | 'scattered'>('fan');

  const center = useMemo(() => (restaurants.length - 1) / 2, [restaurants.length]);

  useEffect(() => {
    // 1단계: 카드들을 모으기
    const timer1 = setTimeout(() => {
      setAnimationPhase('stacked');
    }, 1500);

    // 2단계: 잠깐 대기 후 다시 흩어지기
    const timer2 = setTimeout(() => {
      setAnimationPhase('scattered');
    }, 3000);

    // 3단계: 흩어지고 바로 완료
    const timer3 = setTimeout(() => {
      onComplete();
    }, 3800); // scattered 애니메이션 완료 후 바로 완료

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [restaurants, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="flex flex-1 flex-col overflow-hidden"
    >
      <TopNavigation title="추천 결과" showBackButton />

      <div className="flex w-full items-center justify-center pt-15 pb-10">
        <h1 className="type-gradient text-center heading-3 font-bold">
          모임에 딱 맞는 식당
          <br />
          3개를 선정했어요
        </h1>
      </div>

      <div className="relative flex flex-1 justify-center py-6">
        <div className="relative">
          {restaurants.map((restaurant, index) => {
            const offset = index - center;
            const isCenter = index === Math.round(center);
            const z = index + 1;

            // 각 단계별 위치/각도 계산
            let angle, x, y, opacity, scale;

            switch (animationPhase) {
              case 'fan':
                angle = offset * ANGLE_STEP;
                x = offset * FAN_SPREAD;
                y = isCenter ? 0 : 40;
                opacity = 1;
                scale = 1;
                break;

              case 'stacked':
                angle = 0;
                x = 0;
                y = -index * STACK_STEP_Y;
                opacity = 1;
                scale = 1;
                break;

              case 'scattered': {
                const offsetFromCenter = index - center;
                angle = 0;
                x = offsetFromCenter * FAN_SPREAD;
                y = offsetFromCenter < 0 ? 10 : offsetFromCenter > 0 ? -10 : 0;
                opacity = 0.1;
                scale = 1.1;
                break;
              }
            }

            return (
              <motion.article
                key={restaurant.id}
                className="absolute -translate-x-1/2"
                style={{ width: 'fit-content', transformOrigin: '50% 100%', zIndex: z }}
                initial={false}
                animate={{
                  rotate: angle,
                  x,
                  y,
                  scale,
                  opacity,
                }}
                transition={{
                  type: 'tween',
                  duration: 0.3,
                  ease: 'easeOut',
                }}
              >
                <FanCard restaurant={restaurant} />
              </motion.article>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default FanToSingleAnimation;

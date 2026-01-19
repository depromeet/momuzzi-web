'use client';

import { useLayoutEffect } from 'react';

import { motion, useAnimate } from 'framer-motion';
import Image from 'next/image';

import { Surveys } from '@/app/events/[eventId]/result_refact/_models/result';
import { cn } from '@/lib/cn';

const surveyKeyMap = {
  preferredCuisineList: '음식 종류',
  preferredFlavorList: '선호하는 맛',
  avoidIngredientList: '피해야 하는 재료',
  avoidMenuList: '원치 않는 메뉴',
};

const ENTER_FROM = 120; // 아래에서 출발 높이(px)

interface CardStackAnimationProps {
  cards: Surveys;
  onComplete: () => void;
}

export const CardStackAnimation = ({ cards, onComplete }: CardStackAnimationProps) => {
  const [scope, animate] = useAnimate();
  const keys: (keyof Surveys)[] = Object.keys(cards) as (keyof Surveys)[];

  useLayoutEffect(() => {
    let cancelled = false;

    (async () => {
      const root = scope.current as HTMLElement | null;
      if (!root) return;

      const cards = root.querySelectorAll<HTMLElement>('.card');
      if (!cards.length) return;

      // 1) 초기 상태 세팅 (컨테이너는 아직 opacity-0 상태)
      for (const card of Array.from(cards)) {
        card.setAttribute('data-active', 'false');
        card.style.opacity = '0';

        const details = card.querySelector<HTMLElement>('.details');
        if (details) {
          details.style.height = 'auto'; // 펼친 상태로 입장
          details.style.opacity = '1';
          details.style.overflow = 'hidden';
        }

        const badge = card.querySelector<HTMLElement>('.done-badge');
        if (badge) {
          badge.style.opacity = '0';
          badge.style.transform = 'scale(0.9)';
        }
      }

      // 2) 초기화 끝났으니 이제 컨테이너 보이기 (플래시 방지)
      root.style.opacity = '1';

      // 3) 순차 애니
      for (let i = 0; i < cards.length; i++) {
        if (cancelled) break;

        const card = cards[i];
        const details = card.querySelector<HTMLElement>('.details');
        const badge = card.querySelector<HTMLElement>('.done-badge');

        // 활성 보더 ON
        card.setAttribute('data-active', 'true');

        // ✅ 카드 전체 입장: keyframes로 from 강제 (겹침 방지 위해 인덱스 오프셋 없음)
        await animate(
          card,
          {
            opacity: [0, 1],
            transform: [`translateY(${ENTER_FROM}px) scale(0.98)`, 'translateY(0px) scale(1)'],
          },
          { type: 'spring', duration: 0.4, stiffness: 120, damping: 18 }
        );

        // 잠깐 보여주기
        await animate(details ?? card, {}, { duration: 0.7 });

        // 닫힘 (내용만)
        if (details) {
          await animate(
            details,
            {
              height: 0,
              opacity: 0,
            },
            { duration: 0.25, ease: 'easeInOut' }
          );
          // 완전히 제거
          details.style.display = 'none';
        }

        // 활성 보더 OFF
        card.setAttribute('data-active', 'false');

        // 배지 표시
        if (badge) {
          await animate(badge, { opacity: 1, scale: 1 }, { duration: 0.2, ease: 'easeOut' });
        }
      }

      onComplete?.();
    })();

    return () => {
      cancelled = true;
    };
  }, [animate, scope, keys.length, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="main-container flex w-full flex-col items-center py-16"
    >
      <Image src="/momuzzi-result.png" alt="momuzzi" width={36} height={36} className="h-9 w-9" />
      <h1 className="flex result-text-gradient flex-col items-center pt-6 pb-13 heading-3 font-bold">
        모임원들의 취향을 반영해서
        <br />딱 맞는 식당을 필터링 중이에요
      </h1>

      <div ref={scope} className="flex w-full flex-col items-center gap-4 px-7 opacity-0">
        {keys.map((key) => (
          <article
            key={key}
            className={cn(
              'flex w-full flex-col gap-4 rounded-[0.875rem] border border-transparent bg-white px-5 py-4 will-change-transform',
              'card data-[active=true]:border-orange-200'
            )}
          >
            <div className="flex w-full justify-between">
              <span className="body-3 font-semibold text-orange-800">{surveyKeyMap[key]}</span>
              <span className="done-badge rounded-lg bg-orange-100 px-2 py-1 label-2 font-semibold text-orange-500 opacity-0">
                반영 완료
              </span>
            </div>

            <div className="details flex w-full flex-wrap gap-2 overflow-hidden">
              {cards[key].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-1 rounded-full bg-orange-100 py-1 pr-3 pl-2"
                >
                  <span className="label-1 text-sm font-semibold text-orange-900">{item}</span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </motion.div>
  );
};

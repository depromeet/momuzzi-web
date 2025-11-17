'use client';
import { useMemo, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

import { RecommendedPlace } from '@/app/_services/place';
import PickRankBadge from '@/app/events/[eventId]/_components/PickRankBadge';
import RestaurantCardContent from '@/app/events/[eventId]/_components/RestaurantCardContent';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1080&q=80';

interface RestaurantCardProps {
  place: RecommendedPlace;
  index: number;
  isActive: boolean;
}

/**
 * 유효한 이미지 URL을 반환하는 헬퍼 함수
 */
const getValidImageUrl = (url: string | undefined | null): string => {
  if (url && url.trim() !== '') return url;
  return DEFAULT_IMAGE;
};

const RestaurantCard = ({ place, index, isActive }: RestaurantCardProps) => {
  const images = useMemo(() => place.photos || [], [place.photos]);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const currentImageUrl = useMemo(() => {
    const imageUrl = images[selectedImageIndex];
    return getValidImageUrl(imageUrl);
  }, [images, selectedImageIndex]);

  const handleImageChange = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < images.length) {
      setSelectedImageIndex(newIndex);
    }
  };

  return (
    <div
      className="flex h-full w-full flex-col rounded-4xl p-[0.0625rem]"
      style={{
        boxShadow: '0 0 24px 0 rgba(0, 0, 0, 0.12)',
        background:
          'linear-gradient(33deg, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.72) 100%)',
      }}
    >
      <section className="relative flex h-full w-full overflow-hidden rounded-4xl">
        {/* 로딩 스켈레톤 - 현재 이미지가 로드되지 않았을 때만 표시 */}
        <div className="absolute inset-0 bg-neutral-1400" />

        {/* 이미지 전환 애니메이션 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageUrl}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <Image
              src={currentImageUrl}
              alt={place.name}
              fill
              className="z-10 object-cover"
              priority={index === 0}
              loading={index === 0 ? undefined : 'lazy'}
              sizes="(max-width: 768px) 85vw, 700px"
            />
          </motion.div>
        </AnimatePresence>

        {index < 3 && <PickRankBadge className="absolute top-6 left-0 z-20" rank={index + 1} />}
        <div
          className="z-20 mt-auto w-full px-4 pt-9 pb-5"
          style={{
            background:
              'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.64) 20.67%)',
            minHeight: '240px',
          }}
        >
          <motion.div
            animate={{
              opacity: isActive ? 1 : 0,
              y: isActive ? 0 : 20,
            }}
            initial={index === 0 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.5,
              ease: [0.32, 0.72, 0, 1],
            }}
            style={{
              pointerEvents: isActive ? 'auto' : 'none',
            }}
          >
            <RestaurantCardContent
              place={place}
              imageIndex={selectedImageIndex}
              handleImageChange={handleImageChange}
              theme="heroDark"
              imagePriority={index < 2}
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default RestaurantCard;

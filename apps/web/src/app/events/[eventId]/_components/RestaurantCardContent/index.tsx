'use client';
import { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { Heart, MapPin, Send, Star } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { ReviewModal } from '@/app/_components/ui/Modal';
import { useToast } from '@/app/_features/toast';
import { cn } from '@/app/_lib/cn';
import { usePlaceLikeMutation } from '@/app/_queries/placeQueries';
import { RecommendedPlace } from '@/app/_services/place';
import { CARD_UI } from '@/app/events/[eventId]/_components/RestaurantCardContent/restaurantCardThemes';
import RestaurantImageGallery from '@/app/events/[eventId]/_components/RestaurantCardContent/RestaurantImageGallery';

interface RestaurantCardContentProps {
  place: RecommendedPlace;
  theme: 'lightCompact' | 'heroDark';
  imagePriority: boolean;
  imageIndex?: number;
  handleImageChange?: (index: number) => void;
  className?: string;
}

const RestaurantCardContent = ({
  place,
  imageIndex,
  handleImageChange,
  theme,
  imagePriority,
  className,
}: RestaurantCardContentProps) => {
  const router = useRouter();
  const params = useParams();
  const { eventId: meetingId } = params;

  const { success: successToast } = useToast();

  const placeLikeMutation = usePlaceLikeMutation();
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const ui = CARD_UI[theme]; //ui는 CARD_UI에 정의된 테마 클래스 이름들을 가져옴

  const handleLikeClick = () => {
    placeLikeMutation.mutate({
      meetingId: Number(meetingId),
      placeId: place.placeId,
    });

    // 좋아요를 누를 때만 애니메이션 실행
    if (!place.isLiked) {
      setShowHeartAnimation(true);
      setTimeout(() => setShowHeartAnimation(false), 600);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(place.link);
    successToast('링크가 복사되었습니다.');
  };

  return (
    <div className={cn('flex flex-col', ui.root, className)}>
      {theme === 'lightCompact' && (
        <RestaurantImageGallery
          images={place.photos || []}
          containerClassName={ui.gallery}
          imageClassName={ui.galleryImage}
          isScrollable={true}
          imagePriority={imagePriority}
          imageSkeleton={ui.imageSkeleton}
        />
      )}
      <div className="mb-1 flex w-full items-center justify-between gap-4">
        <span className={ui.title}>{place.name}</span>
        <button type="button" className="cursor-pointer pl-2" onClick={handleCopyLink}>
          <Send className={ui.sendIcon} />
        </button>
      </div>

      <div className="flex w-full items-center gap-4">
        <div className="flex shrink-0 items-center gap-1">
          <Star
            size={16}
            fill="currentColor"
            strokeWidth={1.5}
            absoluteStrokeWidth
            className={ui.metaIcon}
          />
          <span className={cn('label-2 font-medium', ui.metaText)}>
            {place.rating} ({place.userRatingsTotal})
          </span>
        </div>
        <div className="flex flex-grow items-center gap-1">
          <MapPin size={16} strokeWidth={1.5} absoluteStrokeWidth className={ui.metaIcon} />
          <span className={cn('line-clamp-1 label-2 font-medium', ui.metaText)}>
            {place.addressDescriptor?.description || place.address || '위치 정보 없음'}
          </span>
        </div>
      </div>

      <button
        type="button"
        className={cn(
          'w-full cursor-pointer rounded-lg px-3 py-2 transition-all duration-150 active:scale-95 active:opacity-80',
          ui.reviewBox
        )}
        onClick={() => place.topReview?.text && setIsReviewModalOpen(true)}
        disabled={!place.topReview?.text}
      >
        <span className={cn('center line-clamp-2 label-2 font-medium', ui.reviewText)}>
          {place.topReview?.text || '리뷰가 없습니다'}
        </span>
      </button>

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        reviewText={place.topReview?.text || ''}
        rating={place.topReview?.rating}
        theme={theme === 'heroDark' ? 'dark' : 'light'}
      />
      {theme === 'heroDark' && (
        <RestaurantImageGallery
          images={place.photos || []}
          activeIndex={imageIndex || 0}
          onImageChange={handleImageChange}
          containerClassName={ui.gallery}
          imageClassName={ui.galleryImage}
          imagePriority={imagePriority}
          imageSkeleton={ui.imageSkeleton}
        />
      )}

      <div className={cn('flex items-center gap-4', ui.buttonContainer)}>
        <button
          type="button"
          className={cn(
            'h-12 cursor-pointer items-center justify-center rounded-[0.625rem] px-5 label-1 font-semibold',
            ui.addrButton
          )}
          onClick={() => {
            router.push(place.link);
          }}
        >
          <span className={ui.addrText}>지도에서 보기</span>
        </button>
        <button
          type="button"
          className={cn(
            'relative flex h-12 flex-1 shrink-0 cursor-pointer items-center justify-center gap-3 rounded-[0.625rem] font-semibold transition-opacity',
            ui.wishButton,
            placeLikeMutation.isPending && 'opacity-70'
          )}
          onClick={handleLikeClick}
          disabled={placeLikeMutation.isPending}
        >
          <span className={cn('label-1 font-bold', ui.wishCount)}>{place.likeCount}</span>
          <span className="label-1 font-semibold text-white">가고 싶어요</span>
          <div className="relative">
            <Heart
              size={24}
              strokeWidth={1.5}
              absoluteStrokeWidth
              className={cn(
                'text-white transition-all duration-300',
                place.isLiked && 'fill-[#FF4F14] text-[#FF4F14]'
              )}
            />

            <AnimatePresence>
              {showHeartAnimation && (
                <motion.div
                  initial={{ opacity: 1, y: 0, scale: 1 }}
                  animate={{
                    opacity: 0,
                    y: -50,
                    scale: 1.3,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.6,
                    ease: 'easeOut',
                  }}
                  className="pointer-events-none absolute top-0"
                >
                  <Heart
                    size={24}
                    strokeWidth={1.5}
                    absoluteStrokeWidth
                    className="fill-[#FF4F14] text-[#FF4F14]"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </button>
      </div>
    </div>
  );
};

export default RestaurantCardContent;

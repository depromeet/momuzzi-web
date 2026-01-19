'use client';

import { Suspense } from 'react';

import Image from 'next/image';
import { createPortal } from 'react-dom';

import Chip from '@/app/survey/_components/ui/form/Chip';
import { useSurveyCategories } from '@/app/survey/_hooks/useSurveyCategories';
import AvatarIcon from '@/components/ui/AvatarIcon';
import BottomSheet from '@/components/ui/BottomSheet';
import { getCuisineImageSrc } from '@/data/constants/cuisine';
import { MeetingParticipant } from '@/services/overview';

/**
 * PersonaCardSurveyModal
 * - Portal 기반으로 전체 화면(`viewport`)에 띄워지는 모달
 * - 부모 레이아웃의 overflow/position 제약을 받지 않음
 */
interface PersonaCardSurveyModalProps {
  open: boolean;
  onClose: () => void;
  participant: MeetingParticipant;
}

const PersonaCardSurveyModal = ({ open, onClose, participant }: PersonaCardSurveyModalProps) => {
  if (!open) return null;

  // **Portal 루트 DOM 생성**
  if (typeof window === 'undefined') return null;
  const portalRoot = document.body;

  const modalElement = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <BottomSheet
        title="취향 카드"
        onClose={onClose}
        showCloseButton
        heightClassName={'h-full rounded-none'}
      >
        <Suspense fallback={<CuisineSkeleton />}>
          <PersonaCardSurveyContent participant={participant} />
        </Suspense>
      </BottomSheet>
    </div>
  );

  return createPortal(modalElement, portalRoot);
};

export default PersonaCardSurveyModal;

/* ----------------------- 내부 콘텐츠 ----------------------- */

const PersonaCardSurveyContent = ({ participant }: { participant: MeetingParticipant }) => {
  const { categories, isLoading } = useSurveyCategories();

  if (isLoading) return <CuisineSkeleton />;

  // '다 괜찮아요' branch 제외
  const displayCategories = categories.filter((category) => category.name !== '다 괜찮아요');

  const selectedLeafIds = participant.selectedCategories.flatMap((c) =>
    c.leafCategoryList.map((leaf) => leaf.id.toString())
  );

  return (
    <>
      {/* 상단 프로필 */}
      <div className="mb-2 flex items-center gap-3 border-neutral-200 px-1">
        <AvatarIcon variant={participant.profileColor} />
        <div className="flex flex-col">
          <span className="subheading-1 font-bold text-neutral-1600">{participant.nickname}</span>
        </div>
      </div>

      {/* 설문 결과 본문 */}
      <div className="flex max-h-[70vh] flex-col gap-6 overflow-y-auto">
        {displayCategories.map((category) => {
          const iconSrc = getCuisineImageSrc(category.id);
          return (
            <div key={category.id}>
              <div className="mb-4 flex items-center gap-2">
                <Image src={iconSrc} alt={category.name} width={24} height={24} />
                <h3 className="type-gradient subheading-3 font-semibold">{category.name}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.children.map((leaf) => {
                  const isSelected = selectedLeafIds.includes(leaf.id.toString());
                  return (
                    <Chip
                      key={leaf.id}
                      label={leaf.name}
                      selected={isSelected}
                      disabled={!isSelected}
                      variant="cuisine"
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

/* ----------------------- Skeleton ----------------------- */

const CuisineSkeleton = () => (
  <div className="flex animate-pulse flex-col gap-6 px-1 py-4">
    <div className="mb-4 flex items-center gap-3 border-b border-neutral-200 pb-4">
      <div className="h-12 w-12 rounded-xl bg-neutral-200" />
      <div className="flex flex-col gap-2">
        <div className="h-4 w-24 rounded-md bg-neutral-200" />
        <div className="h-3 w-32 rounded-md bg-neutral-100" />
      </div>
    </div>
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i}>
        <div className="mb-3 flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-neutral-200" />
          <div className="h-4 w-20 rounded-md bg-neutral-200" />
        </div>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 6 }).map((__, j) => (
            <div
              key={j}
              className="h-10 w-20 rounded-full border border-neutral-200 bg-neutral-100"
            />
          ))}
        </div>
      </div>
    ))}
  </div>
);

'use client';

import { useState } from 'react';

import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

import AvatarIcon from '@/app/_components/ui/AvatarIcon';
import { getCuisineImageSrc } from '@/app/_constants/cuisine';
import { CuisineCategory, MeetingParticipant } from '@/app/_services/overview';
import PersonaCardLockedOverlay from '@/app/events/[eventId]/overview/_components/persona/PersonaCardLockedOverlay';
import PersonaCardSurveyModal from '@/app/events/[eventId]/overview/_components/persona/PersonaCardSurveyModal';

interface PersonaCardProps {
  participant: MeetingParticipant;
  hasParticipated: boolean;
  isMe: boolean;
}
const PersonaCard = ({ participant, hasParticipated, isMe }: PersonaCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div
        data-id={participant.userId}
        className="flex w-full flex-col gap-6 overflow-hidden rounded-[1.25rem] bg-white"
      >
        <div className="flex items-center gap-3 px-5 pt-5">
          <div className="relative">
            <AvatarIcon variant={participant.profileColor} />
            {isMe && (
              <span
                className="absolute rounded-sm bg-orange-600 px-2 py-0.5 label-2 font-medium text-white"
                style={{ top: '-10px', left: '7px' }} //테일윈드 안먹어서 스타일로 처리
              >
                MY
              </span>
            )}
          </div>
          <span className="line-clamp-1 subheading-1 font-bold text-neutral-1600">
            {participant.nickname}
          </span>
        </div>
        <div className="relative min-h-48 flex-1">
          <div className="flex h-full w-full flex-col gap-6 px-5 pb-5">
            <div className="flex flex-col gap-3 overflow-y-auto">
              {participant.selectedCategories.map((cuisine) => (
                <CuisinePreferenceRow key={cuisine.id} cuisine={cuisine} />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="mt-auto flex items-center justify-center gap-2 rounded-[0.625rem] border border-orange-300 bg-orange-100 px-5 py-3 label-1 font-semibold text-orange-600"
            >
              자세히 보기 <ArrowUpRight className="h-5 w-5" strokeWidth={1.5} absoluteStrokeWidth />
            </button>
          </div>
          {!hasParticipated && <PersonaCardLockedOverlay />}
        </div>
      </div>

      {/* 설문 결과 모달 */}
      <PersonaCardSurveyModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        participant={participant}
      />
    </>
  );
};

export default PersonaCard;

// -------------------------------------------- PersonaCardRow --------------------------------------------
interface CuisinePreferenceRowProps {
  cuisine: CuisineCategory;
}

const CuisinePreferenceRow = ({ cuisine }: CuisinePreferenceRowProps) => {
  return (
    <div className="flex flex-row items-start justify-between gap-2">
      <div className="mt-0.5 flex shrink-0 items-center gap-2">
        <Image
          src={getCuisineImageSrc(cuisine.id)}
          alt={`${cuisine.name} 아이콘`}
          width={20}
          height={20}
          className="h-5 w-5"
        />
        <span className="type-gradient label-1 font-semibold">{cuisine.name}</span>
      </div>
      <div className="flex max-w-[70%] flex-wrap justify-end gap-1">
        {cuisine.leafCategoryList.map((menu) => (
          <div
            key={menu.id}
            className="flex items-center rounded-[2.5rem] bg-neutral-1400/[0.06] px-3 py-1"
          >
            <span className="label-1 font-semibold text-neutral-1400">{menu.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

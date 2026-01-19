'use client';

import { Copy } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';

import useCopyClipBoard from '@/app/events/[eventId]/_hooks/useCopyClipBoard';
import { cn } from '@/lib/cn';

interface PersonaEmptyCardProps {
  className?: string;
}

const PersonaEmptyCard = ({ className }: PersonaEmptyCardProps) => {
  const { eventId } = useParams();
  const { handleCopyUrl, handleShareKakao } = useCopyClipBoard({ meetingId: Number(eventId) || 0 });

  return (
    <div
      data-id="empty-card"
      className={cn(
        'flex w-11/12 shrink-0 flex-col items-center rounded-[1.25rem] bg-white px-5 pt-8',
        className
      )}
    >
      <div className="flex flex-col items-center gap-3">
        <Image
          src={'/images/mommuzzi-group-hungry.svg'}
          alt="mommuzzi-hungry"
          height={100}
          width={128}
        />
        <div className="flex flex-col items-center gap-2">
          <p className="type-gradient text-center subheading-1 font-bold whitespace-pre-line">
            {`아직 참여하지 않은 \n 멤버가 있나요?`}
          </p>
          <p className="text-center label-2 font-medium whitespace-pre-line text-neutral-1400">
            {`더 많은 멤버가 취향 설문에 참여하도록\n 지금 링크를 공유해보세요!`}
          </p>
        </div>
      </div>
      <div className="flex flex-1 flex-row items-center gap-4">
        <button
          type="button"
          className="flex w-23 cursor-pointer flex-col items-center gap-3 py-3"
          onClick={handleShareKakao}
        >
          <div className="flex h-13 w-13 items-center justify-center rounded-full bg-[#FEE500]">
            <Image src={'/icons/kakao-icon.svg'} alt="kakao-icon" width={28} height={28} />
          </div>
          <span className="label-1 font-medium text-neutral-1000">카카오톡</span>
        </button>
        <button
          type="button"
          className="flex w-23 cursor-pointer flex-col items-center gap-3 py-3"
          onClick={handleCopyUrl}
        >
          <div className="flex h-13 w-13 items-center justify-center rounded-full bg-neutral-200">
            <Copy className="h-7 w-7" strokeWidth={2} absoluteStrokeWidth />
          </div>
          <span className="label-1 font-medium text-neutral-1000">URL 복사</span>
        </button>
      </div>
    </div>
  );
};

export default PersonaEmptyCard;

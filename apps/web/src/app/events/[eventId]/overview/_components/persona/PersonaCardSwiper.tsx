'use client';
import { useCallback, useEffect, useState } from 'react';

import useEmblaCarousel from 'embla-carousel-react';

import { cn } from '@/app/_lib/cn';
import { MeetingOverview } from '@/app/_services/overview';
import PersonaCard from '@/app/events/[eventId]/overview/_components/persona/PersonaCard';
import PersonaEmptyCard from '@/app/events/[eventId]/overview/_components/persona/PersonaEmptyCard';
import useOverviewState from '@/app/events/[eventId]/overview/_hooks/useOverviewState';

const PersonaCardSwiper = ({ overview }: { overview: MeetingOverview }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { hasParticipated } = useOverviewState(overview);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const hasRemainingSlots =
    overview.participantList.length < overview.meetingInfo.totalParticipantCnt;
  const totalDots = overview.participantList.length + (hasRemainingSlots ? 1 : 0);

  return (
    <div className="flex flex-col">
      <div className="overflow-x-hidden" ref={emblaRef}>
        <div className="flex w-full gap-4 pt-2 pb-3">
          {overview.participantList.map((participant, index) => (
            <div
              key={participant.userId}
              className={cn(
                'flex w-[84%] shrink-0',
                index === 0 && 'ml-[8%]',
                index === overview.meetingInfo.totalParticipantCnt - 1 && 'mr-[8%]'
              )}
            >
              <PersonaCard
                key={participant.userId}
                participant={participant}
                hasParticipated={hasParticipated}
                isMe={participant.userId === overview.currentUserId}
              />
            </div>
          ))}
          {hasRemainingSlots && (
            <PersonaEmptyCard
              className={cn('mr-[8%] w-[84%] shrink-0', totalDots === 1 && 'ml-[8%]')}
            />
          )}
        </div>
      </div>

      <div className="mb-6 flex flex-row items-center justify-center gap-1">
        {Array.from({ length: totalDots }).map((_, index) => (
          <button
            key={`dot-${index}`}
            onClick={() => scrollTo(index)}
            className={cn(
              'h-1.5 w-1.5 rounded-full',
              selectedIndex === index ? 'bg-orange-600' : 'bg-orange-300'
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default PersonaCardSwiper;

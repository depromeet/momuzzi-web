'use client';

import Link from 'next/link';

import {
  ActiveMeetingCard,
  EmptyActiveMeetingCard,
  EndedMeetingCard,
  SectionHeader,
} from '@/app/(home)/_components';
import { useMeetingsByStatus } from '@/app/(home)/_hooks/useMeetingsByStatus';
import { Meeting } from '@/app/(home)/_models/types';
import { cn } from '@/app/_lib/cn';

interface HomePageClientProps {
  meetings: Meeting[];
}

const HomePageClient = ({ meetings }: HomePageClientProps) => {
  const { activeMeetings, endedMeetings } = useMeetingsByStatus(meetings);

  return (
    <>
      {/* 진행 중인 모임 */}
      <section className="py-2">
        <SectionHeader title="진행 중인 모임" icon="/images/avatar/orange.svg" />
        <div
          className={cn(
            'no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-5',
            activeMeetings.length === 1 && 'justify-center'
          )}
        >
          {activeMeetings.length > 0 ? (
            activeMeetings.map((meeting) => {
              return (
                <Link
                  key={meeting.id}
                  // TODO: 모임현황 일관된 경로로 변경 필요
                  href={`/events/${meeting.id}/overview`}
                  className="min-w-[320px] shrink-0 snap-center"
                >
                  <ActiveMeetingCard meeting={meeting} />
                </Link>
              );
            })
          ) : (
            <EmptyActiveMeetingCard />
          )}
        </div>
      </section>

      {/* 나의 모임 */}
      <section>
        <SectionHeader title="나의 모임" icon="/images/avatar/matcha.svg" />
        <div className="flex flex-col gap-3 px-5 pb-20">
          {endedMeetings.length > 0 ? (
            endedMeetings.map((meeting) => (
              <Link key={meeting.id} href={`/history/${meeting.id}`}>
                <EndedMeetingCard meeting={meeting} />
              </Link>
            ))
          ) : (
            <p className="mx-auto px-5 py-[1.25rem] body-3 leading-6 font-medium text-neutral-800">
              이전 모임이 없어요
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default HomePageClient;

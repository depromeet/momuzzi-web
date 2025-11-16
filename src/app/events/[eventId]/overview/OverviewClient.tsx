'use client';

import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

import CreateMeetingSuccessModal from '@/app/_components/ui/Modal/CreateMeetingSuccessModal';
import ParticipantProgressIndicator from '@/app/_components/ui/ParticipantProgressIndicator';
import { useDisclosure } from '@/app/_hooks/useDisclosure';
import { ApiError } from '@/app/_models/api';
import { getOverviewQueryOptions } from '@/app/_queries/overviewQueries';
import { MeetingOverview } from '@/app/_services/overview';
import PersonaCardSwiper from '@/app/events/[eventId]/overview/_components/persona/PersonaCardSwiper';
import OverviewSkeleton from '@/app/events/[eventId]/overview/_components/Skeleton';
import SurveyActionButton from '@/app/events/[eventId]/overview/_components/SurveyActionButton';
import SurveyStatusBanner from '@/app/events/[eventId]/overview/_components/SurveyStatusBanner';

const OverviewClient = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const { eventId } = params;
  const created = searchParams.get('created');
  const token = searchParams.get('token');

  const { isOpen: modalOpen, handler: modalHandler } = useDisclosure();

  const {
    data: overview,
    isPending,
    error,
  } = useQuery<MeetingOverview, ApiError>({
    ...getOverviewQueryOptions(Number(eventId)),
    retry: false,
    refetchInterval: 4000,
  });

  useEffect(() => {
    if (created) {
      modalHandler.open();
      router.replace(`/events/${eventId}/overview?token=${token}`);
    }
  }, [created, eventId, router, token, modalHandler]);

  if (isPending) return <OverviewSkeleton />;
  if (error) {
    throw error;
  }

  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="flex w-full flex-col items-center gap-3 px-5">
          <SurveyStatusBanner overview={overview} />
          <div className="flex w-full px-4">
            <ParticipantProgressIndicator
              surveyCompletedParticipants={overview.participantList.length}
              totalParticipants={overview.meetingInfo.totalParticipantCnt}
              isSurveyClosed={overview.meetingInfo.isClosed}
              className="w-full pt-10"
            />
          </div>
        </div>
        <div className="flex flex-1 flex-col">
          <PersonaCardSwiper overview={overview} />
        </div>
        <SurveyActionButton overview={overview} />
      </div>
      <CreateMeetingSuccessModal isOpen={modalOpen} onClose={modalHandler.close} />
    </>
  );
};

export default OverviewClient;

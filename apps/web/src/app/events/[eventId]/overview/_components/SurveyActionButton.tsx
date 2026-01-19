'use client';

import { useEffect, useMemo, useTransition } from 'react';

import { useParams, useRouter } from 'next/navigation';

import useOverviewState from '@/app/events/[eventId]/overview/_hooks/useOverviewState';
import Button from '@/components/ui/Button';
import Loading from '@/components/ui/Loading';
import { useCountdownDisplay } from '@/hooks/useCountdownDisplay';
import { MeetingOverview } from '@/services/overview';

const SurveyActionButton = ({ overview }: { overview: MeetingOverview }) => {
  const router = useRouter();
  const { eventId } = useParams();
  const [isPending, startTransition] = useTransition();

  const { hasParticipated } = useOverviewState(overview);
  const { isClosed: isSurveyClosed, totalParticipantCnt, endAt } = overview.meetingInfo;
  const isEveryoneCompleted = overview.participantList.length === totalParticipantCnt;
  const countdown = useCountdownDisplay(new Date(endAt));

  const buttonState = useMemo(() => {
    if (!hasParticipated) {
      return { label: '설문 참여하기', path: `/meetings/${eventId}/survey` };
    }

    if (isSurveyClosed || isEveryoneCompleted) {
      return { label: '추천 결과 보기', path: `/events/${eventId}/analysis` };
    }

    return {
      label: (
        <>
          <span className="body-3 font-semibold">설문 마감까지</span> {countdown}
        </>
      ),
      path: null,
    };
  }, [hasParticipated, isSurveyClosed, isEveryoneCompleted, countdown, eventId]);

  const handleClick = () => {
    if (!buttonState.path) return;

    if (buttonState.path === `/events/${eventId}/analysis`) {
      startTransition(() => {
        router.push(`/events/${eventId}/analysis`);
      });
    } else {
      router.push(buttonState.path);
    }
  };

  useEffect(() => {
    if (isSurveyClosed || isEveryoneCompleted) {
      router.prefetch(`/events/${eventId}/analysis`);
    }
  }, [isSurveyClosed, isEveryoneCompleted, eventId, router]);

  return (
    <>
      {isPending && <Loading />}

      <div className="sticky bottom-0 px-5 py-3">
        <Button onClick={handleClick} disabled={isPending}>
          <span className="body-3 font-semibold text-white">{buttonState.label}</span>
        </Button>
      </div>
    </>
  );
};

export default SurveyActionButton;

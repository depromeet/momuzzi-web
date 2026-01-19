import { useMemo } from 'react';

import { MeetingOverview } from '@/services/overview';

/**
 * 모임 오버뷰 상태를 관리하는 훅
 * @param overview - 모임 오버뷰 데이터
 * @returns 본인 설문 참여 여부, 설문 마감 여부, 모두 설문 완료 여부
 */
const useOverviewState = (overview: MeetingOverview) => {
  const { meetingInfo, participantList, currentUserId } = overview;

  const hasParticipated = useMemo(
    () => participantList.some((p) => p.userId === currentUserId),
    [participantList, currentUserId]
  );

  const isEveryoneCompleted = useMemo(
    () => participantList.length === meetingInfo.totalParticipantCnt,
    [participantList.length, meetingInfo.totalParticipantCnt]
  );

  return { hasParticipated, isEveryoneCompleted };
};

export default useOverviewState;

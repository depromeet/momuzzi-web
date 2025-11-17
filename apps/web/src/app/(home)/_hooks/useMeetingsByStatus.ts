import { useEffect, useMemo, useReducer } from 'react';

import { Meeting } from '@/app/(home)/_models/types';

// const CLOSED_MEETING_ACTIVE_DISPLAY_MS = 6 * 60 * 60 * 1000; // 종료된 모임이 "진행 중"으로 표시되는 시간 (6시간)
const AUTO_UPDATE_INTERVAL_MS = 5 * 60 * 1000; // 자동 업데이트 간격(5분)

const sortByEndDateDesc = (a: Meeting, b: Meeting): number =>
  new Date(b.endAt).getTime() - new Date(a.endAt).getTime();

const isStillActive = (meeting: Meeting): boolean => {
  // TODO: 서비스 뒷단 API 연동 후, isClosed 문제 해결 후 주석 제거
  // if (!meeting.isClosed) return true;

  const now = new Date().getTime();
  const endTime = new Date(meeting.endAt).getTime();
  const timeSinceEnd = now - endTime;

  // return timeSinceEnd < CLOSED_MEETING_ACTIVE_DISPLAY_MS;
  return timeSinceEnd < 0;
};

interface MeetingsByStatusResult {
  activeMeetings: Meeting[];
  endedMeetings: Meeting[];
}

export const useMeetingsByStatus = (meetings: Meeting[]): MeetingsByStatusResult => {
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    const interval = setInterval(forceUpdate, AUTO_UPDATE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  const result = useMemo(() => {
    const active: Meeting[] = [];
    const ended: Meeting[] = [];

    meetings.forEach((meeting) => {
      if (isStillActive(meeting)) {
        active.push(meeting);
      } else {
        if (meeting.participantList.length > 0) {
          ended.push(meeting);
        }
      }
    });

    active.sort(sortByEndDateDesc);
    ended.sort(sortByEndDateDesc);

    return {
      activeMeetings: active,
      endedMeetings: ended,
    };
  }, [meetings]);

  return result;
};

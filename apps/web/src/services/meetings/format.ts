import { Meeting } from '@/app/_models/types';
import { CreateMeetingResponse } from '@/app/meetings/create/_models/types';

import type { MeetingResponse } from '@/data/models/meeting';

export const formatMeetingResponse = (response: MeetingResponse): Meeting => ({
  ...response.meetingInfo,
  participantList: response.participantList,
});

export const formatCreateMeetingResponse = (
  response: CreateMeetingResponse
): { id: number; token: string | null } => {
  const { id, validateTokenUrl } = response;
  const token = new URL(validateTokenUrl).searchParams.get('token');

  if (!token) {
    throw new Error('validateTokenUrl에서 방 토큰을 찾을 수 없음');
  }

  return { id, token };
};

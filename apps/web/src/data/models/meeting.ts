import { AvatarVariantKey } from '@/data/models/avator';

export interface MeetingInfo {
  id: number;
  title: string;
  hostUserId: number;
  totalParticipantCnt: number;
  isClosed: boolean;
  stationName: string;
  endAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface MeetingResponse {
  meetingInfo: MeetingInfo;
  participantList: Participant[];
}

export interface Participant {
  userId: number;
  attendeeNickname: string;
  color: AvatarVariantKey;
}

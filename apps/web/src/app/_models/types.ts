import { MeetingInfo, Participant } from '@/data/models/meeting';

export interface Meeting extends MeetingInfo {
  participantList: Participant[];
}

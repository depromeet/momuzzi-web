import { api } from '@/app/_lib/api';
import { MeetingOverview } from '@/app/_services/overview';
import { CreateMeetingRequest, CreateMeetingResponse } from '@/app/meetings/create/_models/types';

import { formatCreateMeetingResponse, formatMeetingResponse } from './format';

import type { MeetingResponse } from '@/app/_models/meeting';

export const meetingsApi = {
  getMeetings: async () => {
    const response = await api.get<MeetingResponse[]>('/meetings');
    return response.map(formatMeetingResponse);
  },
  getMeetingHistory: (meetingId: number) =>
    api.get<MeetingOverview>(`/meetings/${meetingId}/history`),
  createMeeting: async (form: CreateMeetingRequest) => {
    const response = await api.post<CreateMeetingResponse, CreateMeetingRequest>('/meetings', form);
    return formatCreateMeetingResponse(response);
  },
  joinMeeting: async (token: string) => api.post('/meetings/join', { token }),
  validateToken: (token: string) =>
    api.get<{ token: string }>(`/meetings/validate-invite`, {
      params: { token },
    }),
  getMeetingToken: (meetingId: number) =>
    api.get<{ token: string }>(`/meetings/${meetingId}/invite-token`),
} as const;

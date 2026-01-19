import { api } from '@/lib/api';

export interface InviteToken {
  token: string;
}

export const getInviteToken = async (meetingId: number) => {
  const response = await api.get<InviteToken>(`/meetings/${meetingId}/invite-token`);
  return response.token;
};

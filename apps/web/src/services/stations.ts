import { Station } from '@/app/meetings/create/_models/types';
import { api } from '@/lib/api';

export const stationsApi = {
  getStations: () => api.get<Station[]>('/stations'),
} as const;

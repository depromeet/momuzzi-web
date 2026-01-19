import { createQueryKeys } from '@lukemorales/query-key-factory';

import { getOverview } from '@/services/overview';

export const overviewQueryKeys = createQueryKeys('overview', {
  getOverview: (eventId: number) => [eventId],
});

export const getOverviewQueryOptions = (eventId: number) => ({
  queryKey: overviewQueryKeys.getOverview(eventId).queryKey,
  queryFn: () => getOverview(eventId),
});

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import RestaurantsClient from '@/app/events/[eventId]/restaurants/RestaurantsClient';
import { Heading } from '@/components/typography';
import { getPlacesQueryOptions } from '@/data/queries/placeQueries';

interface RestaurantsPageProps {
  params: Promise<{ eventId: string }>;
}

const RestaurantsPage = async ({ params }: RestaurantsPageProps) => {
  const { eventId: meetingId } = await params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    ...getPlacesQueryOptions(Number(meetingId)),
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <div className="flex flex-1 flex-col">
      <Heading level="h3" as="h1" className="px-5 py-2 text-white">
        우리 모임이 Pick한 식당
      </Heading>
      <HydrationBoundary state={dehydratedState}>
        <RestaurantsClient />
      </HydrationBoundary>
    </div>
  );
};

export default RestaurantsPage;

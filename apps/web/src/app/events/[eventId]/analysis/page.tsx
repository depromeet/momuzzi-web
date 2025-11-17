import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import Image from 'next/image';

import { Heading } from '@/app/_components/typography';
import { getOverviewQueryOptions } from '@/app/_queries/overviewQueries';
import { getPlacesQueryOptions } from '@/app/_queries/placeQueries';
import { MeetingOverview } from '@/app/_services/overview';
import MorePicksButton from '@/app/events/[eventId]/_components/MorePicksButton';
import MenuPreferenceList from '@/app/events/[eventId]/analysis/_components/MenuPreferenceList';
import PieChart from '@/app/events/[eventId]/analysis/_components/PieChart';
import RestaurantCardSwiper from '@/app/events/[eventId]/analysis/_components/RestaurantCardSwiper';
import { buildPreferenceSummary } from '@/app/events/[eventId]/analysis/_utils';

interface AnalysisPageProps {
  params: Promise<{
    eventId: string;
  }>;
}

const AnalysisPage = async ({ params }: AnalysisPageProps) => {
  const { eventId } = await params;

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      ...getPlacesQueryOptions(Number(eventId)),
    }),
    queryClient.prefetchQuery({
      ...getOverviewQueryOptions(Number(eventId)),
    }),
  ]);

  const dehydratedState = dehydrate(queryClient);

  const overview = queryClient.getQueryData<MeetingOverview>(
    getOverviewQueryOptions(Number(eventId)).queryKey
  );

  const { mainCountsArr } = buildPreferenceSummary(overview?.participantList || []);

  const cuisinesChartData = mainCountsArr.map((main) => ({
    name: main.name,
    value: main.count,
  }));

  return (
    <div className="flex flex-1 flex-col">
      <Heading level="h2" as="h1" className="px-5 py-2 whitespace-pre-line text-white">
        {overview?.meetingInfo.title}
      </Heading>
      <HydrationBoundary state={dehydratedState}>
        <RestaurantCardSwiper />
      </HydrationBoundary>

      <div className="h-2 w-full bg-neutral-1500" />

      <div className="flex w-full flex-1 flex-col gap-9 px-5 py-[1.9375rem]">
        <Heading level="h2" className="whitespace-pre-line text-white">
          {'이번 모임에서의 주로\n 취향 설문 결과예요'}
        </Heading>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <Image src="/images/avatar/orange.svg" alt="orange" width={24} height={24} />
            <span className="body-3 font-semibold text-neutral-400">선호하는 음식</span>
          </div>
          <PieChart data={cuisinesChartData} />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <Image src="/images/avatar/default.svg" alt="default" width={24} height={24} />
            <span className="body-3 font-semibold text-neutral-400">선호하는 메뉴</span>
          </div>
          <HydrationBoundary state={dehydratedState}>
            <MenuPreferenceList />
          </HydrationBoundary>
        </div>
      </div>

      <MorePicksButton showHomeButton />
    </div>
  );
};

export default AnalysisPage;

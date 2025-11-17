import Image from 'next/image';

import MenuPreferenceList from '@/app/(home)/history/_components/MenuPreferenceList';
import TopNavigation from '@/app/_components/layout/TopNavigation';
import { Heading } from '@/app/_components/typography';
import { meetingsApi } from '@/app/_services/meetings';
import { MeetingOverview } from '@/app/_services/overview';
import PieChart from '@/app/events/[eventId]/analysis/_components/PieChart';
import { buildPreferenceSummary } from '@/app/events/[eventId]/analysis/_utils';

const MeetingHistroyPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const history: MeetingOverview = await meetingsApi.getMeetingHistory(Number(id));

  const { mainCountsArr } = buildPreferenceSummary(history?.participantList || []);

  const cuisinesChartData = mainCountsArr.map((main) => ({
    name: main.name,
    value: main.count,
  }));

  return (
    <div className="no-scrollbar h-[100dvh] overflow-auto bg-neutral-1600">
      <TopNavigation showBackButton leftHref={`/`} className="text-white" />

      <div className="flex w-full flex-1 flex-col gap-9 bg-neutral-1600 px-5 py-[1.9375rem]">
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
          <MenuPreferenceList history={history} />
        </div>
      </div>
    </div>
  );
};

export default MeetingHistroyPage;

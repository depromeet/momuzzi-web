import { Suspense } from 'react';

import { HomePageLayout, HomePageClient, Skeleton } from '@/app/_components';
import { Meeting } from '@/app/_models/types';
import { meetingsApi } from '@/services/meetings';

const HomePageContent = async () => {
  const meetings: Meeting[] = await meetingsApi.getMeetings();
  return <HomePageClient meetings={meetings} />;
};

const HomeSkeleton = () => (
  <>
    <Skeleton />
    <Skeleton />
  </>
);

const HomePage = async ({ searchParams }: { searchParams: Promise<{ error?: string }> }) => {
  const { error: errorCode } = await searchParams;

  return (
    <Suspense>
      <HomePageLayout errorCode={errorCode}>
        <Suspense fallback={<HomeSkeleton />}>
          <HomePageContent />
        </Suspense>
      </HomePageLayout>
    </Suspense>
  );
};

export default HomePage;

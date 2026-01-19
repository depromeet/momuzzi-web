import TopNavigation from '@/components/layout/TopNavigation';

const AnalysisLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ eventId: string }>;
}) => {
  const { eventId } = await params;

  return (
    <div className="flex flex-1 flex-col bg-neutral-1600">
      <TopNavigation
        showBackButton
        leftHref={`/events/${eventId}/overview`}
        className="text-white"
      />
      {children}
    </div>
  );
};

export default AnalysisLayout;

import TopNavigation from '@/components/layout/TopNavigation';

interface OverviewLayoutProps {
  children: React.ReactNode;
}
const OverviewLayout = ({ children }: OverviewLayoutProps) => {
  return (
    <div className="flex flex-1 flex-col background-2">
      <TopNavigation showBackButton leftHref="/" />
      {children}
    </div>
  );
};

export default OverviewLayout;

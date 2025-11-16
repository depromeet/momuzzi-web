import { TitleGroup } from '@/app/_components/typography';
import Button from '@/app/_components/ui/Button';
import CuisineNoticeFrame from '@/app/survey/_components/ui/modal/CuisineNoticeFrame';

interface StepFormLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  onNext: () => void;
  onCancel?: () => void;
  isNextDisabled?: boolean;
  prevButtonText?: string;
  nextButtonText?: string;
  showNotice?: boolean;
}

const StepFormLayout = ({
  title,
  description,
  children,
  onNext,
  onCancel,
  isNextDisabled,
  prevButtonText = '이전',
  nextButtonText = '다음 단계로',
  showNotice = false,
}: StepFormLayoutProps) => {
  return (
    <main className="relative flex h-[100dvh] flex-1 flex-col">
      {/* 제목 */}
      <div className="pt-4">
        <TitleGroup title={title} description={description} />
      </div>

      {/* 스크롤 영역 */}
      <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>

      <div className="sticky bottom-0 flex w-full flex-col">
        {showNotice && <CuisineNoticeFrame />}
        <div className="flex gap-3 bg-orange-50 py-3">
          {onCancel && (
            <Button theme="gray" onClick={onCancel} className="w-[114px]">
              {prevButtonText}
            </Button>
          )}
          <Button
            status={isNextDisabled ? 'disabled' : 'normal'}
            onClick={onNext}
            className="flex-1"
          >
            {nextButtonText}
          </Button>
        </div>
      </div>
    </main>
  );
};

export default StepFormLayout;

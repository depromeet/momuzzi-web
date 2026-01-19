'use client';

import TopNavigation from '@/components/layout/TopNavigation';
import StepIndicator from '@/components/ui/StepIndicator';
import { cn } from '@/lib/cn';

interface SurveyLayoutProps {
  /** 1-base 현재 스텝 값 (StepIndicator 와 동일 기준)*/
  stepValue: number;
  /** 전체 스텝 수 */
  totalSteps: number;
  /** 상단 뒤로가기 핸들러 */
  onBack?: () => void;
  /** 상단 타이틀(옵션) */
  title?: string;
  /** 본문 */
  children: React.ReactNode;
  /** 레이이웃 className 커스텀(옵션) */
  className?: string;

  /** 상단 오른쪽 버튼 (선택적) */
  showNextButton?: boolean;
  /** 상단 다음 핸들러 */
  onRightClick?: () => void;
  /** 텍스트 버튼 (ex. '건너뛰기') */
  rightLabel?: string;
}

/**
 * SurveyLayout
 * - 상단 네비 + 스텝 인디케이터 + 본문 컨테이너
 * - meetings/create와 동일한 상단 구성을 재사용 'h-[100dvh]'
 */
const SurveyLayout = ({
  stepValue,
  totalSteps,
  onBack,
  title = '',
  children,
  className,
  showNextButton = false,
  onRightClick,
  rightLabel,
}: SurveyLayoutProps) => {
  return (
    <div
      id="survey-layout-root"
      className={cn('relative flex min-h-dvh flex-col background-1', className)}
    >
      <TopNavigation
        title={title}
        showBackButton={false}
        showNextButton={showNextButton}
        onLeftClick={onBack}
        onRightClick={onRightClick}
        rightLabel={rightLabel}
        className="pb-0"
      />
      <div className="flex items-center justify-center px-4 py-1.5">
        <StepIndicator value={stepValue} total={totalSteps} />
      </div>
      {/* 본문 영역 */}
      <div className="flex min-h-0 flex-1 flex-col px-5">{children}</div>
    </div>
  );
};

export default SurveyLayout;

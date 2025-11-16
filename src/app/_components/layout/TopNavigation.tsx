import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/app/_lib/cn';

interface TopNavigationProps {
  title?: string;
  showBackButton?: boolean;
  showNextButton?: boolean;
  onLeftClick?: () => void;
  onRightClick?: () => void;
  leftHref?: string; // 왼쪽 버튼 링크 경로
  rightHref?: string; // 오른쪽 버튼 링크 경로
  leftAriaLabel?: string; // 왼쪽 버튼 접근성 라벨
  rightAriaLabel?: string; // 오른쪽 버튼 접근성 라벨
  rightLabel?: string; // 오른쪽 버튼 텍스트 (아이콘 대신 표시)
  rightComponent?: React.ReactNode; // 오른쪽에 표시할 커스텀 컴포넌트 (화살표 대신)
  className?: string;
}

/**
 * 화면 상단 네비게이션 컴포넌트 (서버 컴포넌트)
 *
 * @description 왼쪽/오른쪽 버튼과 타이틀을 포함한 상단 네비게이션 바입니다.
 * Link 컴포넌트를 사용하여 서버 컴포넌트로 구현되었습니다.
 * 접근성을 위한 aria-label을 지원합니다.
 *
 * @param title - 네비게이션 바 중앙에 표시될 제목
 * @param showBackButton - 뒤로가기 버튼 표시 여부 (기본값: false)
 * @param showNextButton - 다음 버튼 표시 여부 (기본값: false)
 * @param onLeftClick - 왼쪽 버튼 클릭 이벤트 (Link 사용 시 무시됨)
 * @param onRightClick - 오른쪽 버튼 클릭 이벤트 (Link 사용 시 무시됨)
 * @param leftHref - 왼쪽 버튼 링크 경로 (제공되면 Link로 렌더링)
 * @param rightHref - 오른쪽 버튼 링크 경로 (제공되면 Link로 렌더링)
 * @param leftAriaLabel - 왼쪽 버튼의 접근성 라벨 (기본값: "뒤로가기")
 * @param rightAriaLabel - 오른쪽 버튼의 접근성 라벨 (기본값: "다음")
 * @param rightLabel - 오른쪽 버튼 텍스트 (기본값: "아이콘")
 * @param className - 추가 CSS 클래스
 *
 * @note 기본 버튼 텍스트의 색상은 neutral-1200입니다. 필요시 className="text-[color]"로 변경할 수 있습니다.
 *
 * @returns JSX.Element
 */
const TopNavigation = ({
  title,
  showBackButton = false,
  showNextButton = false,
  onLeftClick,
  onRightClick,
  leftHref,
  rightHref,
  leftAriaLabel = '뒤로가기',
  rightAriaLabel = '다음',
  rightLabel,
  rightComponent,
  className,
}: TopNavigationProps) => {
  const renderLeftButton = () => {
    if (!showBackButton) return null;

    const buttonContent = (
      <ChevronLeft size={24} strokeWidth={2} absoluteStrokeWidth className="text-inherit" />
    );

    if (leftHref) {
      return (
        <Link
          href={leftHref}
          aria-label={leftAriaLabel}
          className="flex cursor-pointer items-center justify-center bg-transparent text-current"
        >
          {buttonContent}
        </Link>
      );
    }

    return (
      <button
        type="button"
        onClick={onLeftClick}
        aria-label={leftAriaLabel}
        className="flex cursor-pointer items-center justify-center bg-transparent text-current"
      >
        {buttonContent}
      </button>
    );
  };

  const renderRightButton = () => {
    if (!showNextButton) return null;

    if (rightComponent) {
      return rightComponent;
    }

    if (rightLabel) {
      const buttonContent = rightLabel;

      if (rightHref) {
        return (
          <Link
            href={rightHref}
            aria-label={rightAriaLabel}
            className="cursor-pointer text-orange-700"
          >
            {buttonContent}
          </Link>
        );
      }

      return (
        <button
          type="button"
          onClick={onRightClick}
          aria-label={rightAriaLabel}
          className="cursor-pointer text-inherit"
        >
          {buttonContent}
        </button>
      );
    }

    const buttonContent = (
      <ChevronRight size={32} strokeWidth={2} absoluteStrokeWidth className="text-inherit" />
    );

    if (rightHref) {
      return (
        <Link
          href={rightHref}
          aria-label={rightAriaLabel}
          className="flex cursor-pointer items-center justify-center bg-transparent text-current"
        >
          {buttonContent}
        </Link>
      );
    }

    return (
      <button
        type="button"
        onClick={onRightClick}
        aria-label={rightAriaLabel}
        className="flex cursor-pointer items-center justify-center bg-transparent text-current"
      >
        {buttonContent}
      </button>
    );
  };

  return (
    <div
      className={cn(
        'sticky top-0 z-10 flex w-full shrink-0 items-center justify-between bg-inherit px-4 pt-2 pb-2 text-orange-800',
        className
      )}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center">{renderLeftButton()}</div>

      <span className="absolute left-1/2 -translate-x-1/2 transform body-3 font-semibold">
        {title}
      </span>

      <div className="flex h-9 shrink-0 items-center justify-center">{renderRightButton()}</div>
    </div>
  );
};

export default TopNavigation;

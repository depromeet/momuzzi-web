'use client';

import { Text } from '@/components/typography';
import { cn } from '@/lib/cn';

type ChipVariant = 'any' | 'cuisine';

export interface ChipProps {
  label: string;
  selected?: boolean;
  disabled?: boolean;
  orderBadge?: number;
  onClick?: () => void;
  variant?: ChipVariant;
  startIcon?: React.ReactNode;
}

const Chip = ({
  label,
  selected = false,
  disabled = false,
  orderBadge,
  onClick,
  variant = 'cuisine',
  startIcon: _startIcon,
}: ChipProps) => {
  const padding = variant === 'any' ? 'px-5' : 'px-5';
  const baseH = 'h-12';
  const radius = 'rounded-[40px]';

  const common = cn(
    'relative inline-flex select-none items-center justify-center gap-1 whitespace-nowrap',
    padding,
    baseH,
    'py-3 border transition-colors duration-200',
    radius,
    disabled ? 'bg-gray-500 cursor-not-allowed opacity-60' : 'cursor-pointer'
  );

  // 선택 안 된 칩
  const unselectedCls = cn(common, 'bg-white border-gray-300 text-neutral-1500');

  // 선택된 칩 — chip-gradient 배경으로 통일
  const selectedCls = cn(
    common,
    'border-transparent text-white chip-gradient shadow-[0_2px_4px_rgba(255,79,20,0.3)] text-neutral-100'
  );

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={selected ? selectedCls : unselectedCls}
    >
      {/* 선택 순서 배지 */}
      {selected && typeof orderBadge === 'number' && orderBadge > 0 && (
        <span
          className={cn(
            'absolute -top-1 left-1 flex h-5 w-5 items-center justify-center rounded-full border border-orange-500 bg-white text-orange-500'
          )}
        >
          <span className="text-[11px] leading-none">{orderBadge}</span>
        </span>
      )}

      <span className="flex items-center gap-1">
        {/* 아이콘: 크기 통일 */}
        <Text
          className={cn(
            'body-3 leading-6 font-semibold',
            selected ? 'text-neutral-100' : 'text-neutral-1500'
          )}
        >
          {label}
        </Text>
      </span>
    </button>
  );
};

export default Chip;

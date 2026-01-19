'use client';

import { useCallback, useMemo } from 'react';

import Image from 'next/image';

import Chip from '@/app/survey/_components/ui/form/Chip';
import { MAX_SELECT_COUNT } from '@/app/survey/_models/constants';
import { useToast } from '@/features/toast';

export interface ChipOption {
  id: string;
  label: string;
  variant?: 'any' | 'cuisine';
  startIcon?: React.ReactNode;
}

export interface ChipGroupMultiSelectProps {
  options: ReadonlyArray<ChipOption>;
  selectedIds: string[];
  exclusiveIds?: readonly string[];
  onChange?: (ids: string[]) => void;
  className?: string;
}

const ChipGroupMultiSelect = ({
  options,
  selectedIds,
  exclusiveIds = [],
  onChange,
  className,
}: ChipGroupMultiSelectProps) => {
  const { toast: customToast } = useToast();

  const activeExclusive = useMemo(
    () => selectedIds.find((id) => exclusiveIds.includes(id)),
    [selectedIds, exclusiveIds]
  );

  const toggle = useCallback(
    (id: string) => {
      const has = selectedIds.includes(id);
      const isExclusive = exclusiveIds.includes(id);

      // 1. 이미 선택된 경우 → 제거
      if (has) {
        onChange?.(selectedIds.filter((v) => v !== id));
        return;
      }

      // 2. 배타 옵션 선택 시 → 단독 선택
      if (isExclusive) {
        onChange?.([id]);
        return;
      }

      // 3. 일반 옵션 선택 시
      const base = activeExclusive ? [] : selectedIds;

      // 최대 선택 개수 초과 시 토스트
      if (base.length >= MAX_SELECT_COUNT) {
        customToast(
          <div className="flex items-center gap-2">
            <Image
              src="/icons/exclamation.svg"
              alt="!"
              width={24}
              height={24}
              className="h-8 w-8"
            />
            <span className="text-gray-1500 body-3 font-semibold">
              최대 5개까지 선택 가능합니다
            </span>
          </div>,
          { showIcon: false, duration: 3000 }
        );
        return;
      }

      onChange?.([...base, id]);
    },
    [selectedIds, exclusiveIds, activeExclusive, onChange, customToast]
  );

  // disabled 로직 수정 — 더 이상 maxedOut으로 막지 않음
  const isDisabled = (id: string) => {
    const isExclusive = exclusiveIds.includes(id);
    return Boolean(activeExclusive && !isExclusive);
  };

  const orderOf = (id: string) => {
    const option = options.find((o) => o.id === id);
    if (option?.variant === 'any') return 0;
    const idx = selectedIds.indexOf(id);
    return idx >= 0 ? idx + 1 : 0;
  };

  const anyChip = options.find((o) => o.variant === 'any');
  const restChips = options.filter((o) => o !== anyChip);

  return (
    <div className={className}>
      {/* ANY 단독 행 */}
      {anyChip && (
        <div className="mb-2 flex">
          <Chip
            key={anyChip.id}
            label={anyChip.label}
            variant="any"
            selected={selectedIds.includes(anyChip.id)}
            disabled={isDisabled(anyChip.id)}
            orderBadge={orderOf(anyChip.id)}
            startIcon={anyChip.startIcon}
            onClick={() => toggle(anyChip.id)}
          />
        </div>
      )}

      {/* 나머지 칩 */}
      <div className="flex flex-wrap gap-2">
        {restChips.map((o) => (
          <Chip
            key={o.id}
            label={o.label}
            variant={o.variant ?? 'cuisine'}
            selected={selectedIds.includes(o.id)}
            disabled={isDisabled(o.id)}
            orderBadge={orderOf(o.id)}
            startIcon={o.startIcon}
            onClick={() => toggle(o.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ChipGroupMultiSelect;

'use client';

import { useMemo } from 'react';

import { X } from 'lucide-react';
import Image from 'next/image';

import { cn } from '@/lib/cn';

interface FoodConfirmModalProps {
  open: boolean;
  title: string;
  subtitle?: string;
  selectedFoods: {
    categoryLabel: string;
    detailLabel: string;
    iconSrc: string;
  }[];
  onCancel: () => void;
  onConfirm: () => void;
}

const FoodConfirmModal = ({
  open,
  title,
  subtitle,
  selectedFoods,
  onCancel,
  onConfirm,
}: FoodConfirmModalProps) => {
  const groupedEntries = useMemo<[string, (typeof selectedFoods)[number][]][]>(() => {
    const grouped = selectedFoods.reduce<Record<string, (typeof selectedFoods)[number][]>>(
      (acc, food) => {
        const key = food.categoryLabel;
        if (!acc[key]) acc[key] = [];
        acc[key].push(food);
        return acc;
      },
      {}
    );
    return Object.entries(grouped);
  }, [selectedFoods]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative flex max-h-[90vh] w-[89%] max-w-[335px] flex-col items-center overflow-auto rounded-2xl bg-white shadow-lg">
        {/* X 버튼 영역 */}
        <div className="w-full px-4 pt-4 pb-3">
          <div className="flex w-full justify-end">
            <button
              type="button"
              onClick={onCancel}
              aria-label="닫기"
              className="flex h-6 w-6 cursor-pointer items-center justify-center text-neutral-1600 hover:opacity-70"
            >
              <X size={24} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="flex w-full flex-col items-start gap-1 px-4">
          <h2
            id="modal-title"
            className="bg-gradient-to-r from-orange-900 via-orange-800 to-orange-800 bg-clip-text heading-3 font-bold tracking-tight text-transparent"
          >
            {title}
          </h2>
          {subtitle && <p className="pt-1 subheading-3 font-medium text-neutral-800">{subtitle}</p>}
        </div>

        {/* 음식 리스트 Frame */}
        <div className="flex w-full flex-col gap-4 px-4 pt-4 pb-6">
          {groupedEntries.map(([categoryLabel, foods]) => (
            <div key={categoryLabel} className="flex flex-col gap-2">
              {/* 한 줄짜리 행: 왼쪽은 아이콘+분류, 오른쪽은 첫 칩 */}
              <div className="flex w-full items-center justify-between">
                {/* 아이콘 + 분류 */}
                <div className="flex items-center gap-2">
                  <Image
                    src={foods[0].iconSrc}
                    alt={categoryLabel}
                    width={20}
                    height={20}
                    className="aspect-square"
                  />
                  <span className="title-gradient pl-2 label-1 font-semibold">{categoryLabel}</span>
                </div>

                {/* 첫 번째 칩 */}
                {foods[0] && (
                  <div className="rounded-full bg-black/5 px-3 py-1">
                    <span className="label-1 font-semibold text-neutral-1400">
                      {foods[0].detailLabel}
                    </span>
                  </div>
                )}
              </div>

              {/* 나머지 칩들 (두 번째 이후부터) */}
              {foods.slice(1).map((food, idx) => (
                <div key={`${categoryLabel}-${idx}`} className="flex w-full justify-end">
                  <div className="rounded-full bg-black/5 px-3 py-1">
                    <span className="label-1 font-semibold text-neutral-1400">
                      {food.detailLabel}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* CTA Button Frame */}
        <div className="flex w-full items-center gap-3 px-5 pb-6">
          <button
            type="button"
            onClick={onCancel}
            className="flex h-[62px] w-[114px] cursor-pointer items-center justify-center rounded-[14px] bg-neutral-300 text-[16px] font-semibold text-neutral-1400"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={cn(
              'flex h-[62px] flex-1 cursor-pointer items-center justify-center rounded-[14px] text-[16px] font-semibold text-white',
              'bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400'
            )}
          >
            제출하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodConfirmModal;

'use client';

import { useEffect, useState } from 'react';

import { ChevronDown, ChevronUp } from 'lucide-react';

import { cn } from '@/lib/cn';

import { convertTo12HourFormat } from '../_utils/timeFormat';

interface TimePickerScrollProps {
  onTimeChange: (time: string | null) => void;
  defaultTime?: string | null;
}

type Period = '오전' | '오후';

const TimePickerScroll = ({ onTimeChange, defaultTime }: TimePickerScrollProps) => {
  const initialState = convertTo12HourFormat(defaultTime) as { hour: number; period: Period };
  const [hour, setHour] = useState(initialState.hour);
  const [period, setPeriod] = useState<Period>(initialState.period);

  const periods: Period[] = ['오전', '오후'];
  const hours = Array.from({ length: 12 }, (_, index) => index + 1);

  const periodIndex = periods.indexOf(period);
  const hourIndex = hours.indexOf(hour);

  // 시간 아이템 높이 계산
  const itemHeight = 46; // 각 아이템의 높이
  const totalItemHeight = 46 + 8; // 아이템 + 간격
  const paddingHeight = 48; // 위쪽 패딩
  const containerHeight = 140; // 컨테이너 높이
  const centerOffset = containerHeight / 2 - itemHeight / 2;

  // 스크롤 위치 계산 (선택된 아이템이 가운데에 오도록)
  const periodOffset = -(periodIndex * totalItemHeight + paddingHeight - centerOffset + 13);
  const hourOffset = -(hourIndex * totalItemHeight + paddingHeight - centerOffset + 13);

  useEffect(() => {
    const fullHour = period === '오전' ? (hour === 12 ? 0 : hour) : hour === 12 ? 12 : hour + 12;
    const timeString = String(fullHour).padStart(2, '0');
    onTimeChange(timeString);
  }, [hour, period, onTimeChange]);

  const isPeriodUpDisabled = period === '오전';
  const isPeriodDownDisabled = period === '오후';
  const isHourUpDisabled = hour === 1;
  const isHourDownDisabled = hour === 12;

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex justify-center gap-3">
        <div className="flex w-full flex-col items-center gap-3">
          <button
            type="button"
            onClick={() => setPeriod('오전')}
            disabled={isPeriodUpDisabled}
            className={'flex items-center justify-center rounded transition-colors'}
            aria-label="이전"
          >
            <ChevronUp
              size={24}
              strokeWidth={2}
              className={cn(isPeriodUpDisabled ? 'text-neutral-400' : 'text-neutral-1600')}
            />
          </button>

          <div className="relative h-35 w-full overflow-hidden rounded-lg bg-[#f6f7f9]">
            <div
              className="flex flex-col gap-2 px-5 py-2 transition-transform duration-300"
              style={{ transform: `translateY(${periodOffset}px)` }}
            >
              <div className="h-12" />
              {periods.map((period_) => (
                <div
                  key={period_}
                  className={cn(
                    'p-2 text-center body-1 transition-colors duration-200',
                    period_ === period ? 'text-neutral-1600' : 'text-neutral-400'
                  )}
                >
                  {period_}
                </div>
              ))}
              <div className="h-12" />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setPeriod('오후')}
            disabled={isPeriodDownDisabled}
            className={'flex items-center justify-center rounded transition-colors'}
            aria-label="다음"
          >
            <ChevronDown
              size={24}
              strokeWidth={2}
              className={cn(isPeriodDownDisabled ? 'text-neutral-400' : 'text-neutral-1600')}
            />
          </button>
        </div>

        <div className="flex w-full flex-col items-center gap-3">
          <button
            type="button"
            onClick={() => setHour((prev) => prev - 1)}
            disabled={isHourUpDisabled}
            className={cn('flex items-center justify-center rounded transition-colors')}
            aria-label="이전"
          >
            <ChevronUp
              size={24}
              strokeWidth={2}
              className={cn(isHourUpDisabled ? 'text-neutral-400' : 'text-neutral-1600')}
            />
          </button>

          <div className="relative h-35 w-full overflow-hidden rounded-lg bg-[#f6f7f9]">
            <div
              className="flex flex-col gap-2 px-5 py-2 transition-transform duration-300"
              style={{ transform: `translateY(${hourOffset}px)` }}
            >
              <div className="h-12" />
              {hours.map((hour_) => (
                <div
                  key={hour_}
                  className={cn(
                    'p-2 text-center body-1 transition-colors duration-200',
                    hour_ === hour ? 'text-neutral-1600' : 'text-neutral-400'
                  )}
                >
                  {hour_.toString()}시
                </div>
              ))}
              <div className="h-12" />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setHour((prev) => prev + 1)}
            disabled={isHourDownDisabled}
            className={cn('flex h-8 w-8 items-center justify-center rounded transition-colors')}
            aria-label="다음"
          >
            <ChevronDown
              size={24}
              strokeWidth={2}
              className={cn(isHourDownDisabled ? 'text-neutral-400' : 'text-neutral-1600')}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimePickerScroll;

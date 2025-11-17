'use client';

import { useState, useCallback } from 'react';

import { DatePicker } from '@mantine/dates';
import { CalendarDays, Clock } from 'lucide-react';

import BottomSheet from '@/app/_components/ui/BottomSheet';
import Button from '@/app/_components/ui/Button';
import { cn } from '@/app/_lib/cn';
import TimePickerScroll from '@/app/meetings/create/_components/TimePickerScroll';
import { formatTimeDisplay, isValidDateTime } from '@/app/meetings/create/_utils/timeFormat';

import 'dayjs/locale/ko';

interface DateTimePickerProps {
  date: string | null;
  time: string | null;
  onDateChange: (date: string | null) => void;
  onTimeChange: (time: string | null) => void;
}

const DateTimePicker = ({ date, time, onDateChange, onTimeChange }: DateTimePickerProps) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [tempDate, setTempDate] = useState<string | null>(date);

  const handleOpenCalendar = useCallback(() => {
    setTempDate(date);
    setShowCalendar(true);
  }, [date]);

  const handleConfirmDate = useCallback(() => {
    onDateChange(tempDate);
    setShowCalendar(false);
  }, [tempDate, onDateChange]);

  console.log('zxcvxcz', isValidDateTime(tempDate, time));

  return (
    <>
      <div className="flex items-center">
        <button
          type="button"
          onClick={handleOpenCalendar}
          className={cn(
            'flex flex-1 items-center gap-8 border-b-1 border-b-neutral-200 pt-3 pr-3 pb-2 pl-1 body-2 font-semibold text-neutral-400',
            date && 'text-gray-1500'
          )}
        >
          <div className="flex items-center gap-4">
            <CalendarDays size={20} strokeWidth={2.5} className="text-neutral-400" />
            {date || '날짜 선택하기'}
          </div>
          <div className="flex items-center gap-4">
            <Clock size={20} strokeWidth={2.5} className="text-neutral-400" />
            {formatTimeDisplay(time)}
          </div>
        </button>
      </div>

      {showCalendar && (
        <BottomSheet title="모임 날짜/시간" onClose={() => setShowCalendar(false)} showCloseButton>
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="flex w-full flex-col items-center justify-center gap-1">
              <p className="self-start py-1 label-1 text-sm font-semibold text-neutral-800">
                날짜 선택
              </p>
              <DatePicker
                value={tempDate}
                onChange={(date) => setTempDate(date)}
                minDate={new Date()}
                defaultDate={date || new Date()}
                locale="ko"
                hideOutsideDates
                size="md"
                decadeLabelFormat="YYYY년"
                yearLabelFormat="YYYY년"
                monthLabelFormat="YYYY MM월"
                styles={{
                  calendarHeaderLevel: {
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#131416',
                    lineHeight: '1.5rem',
                    letterSpacing: ' -0.01%',
                  },
                  day: {
                    fontSize: '0.875rem',
                    color: '#131416',
                    lineHeight: '1.375rem',
                    letterSpacing: ' -0.01%',
                    fontWeight: '500',
                  },
                  weekday: {
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#9ba3b0',
                    lineHeight: '1.375rem',
                    letterSpacing: ' -0.01%',
                  },
                }}
              />
            </div>

            <div className="flex w-full flex-col items-center justify-center gap-1">
              <p className="self-start py-1 label-1 text-sm font-semibold text-neutral-800">
                시간 선택
              </p>
            </div>
            <TimePickerScroll onTimeChange={onTimeChange} defaultTime={time} />
            {!isValidDateTime(tempDate, time) && tempDate && time && (
              <p className="text-xs text-red-500">
                현재 시간으로부터 2시간 이후 시간을 선택해주세요
              </p>
            )}

            <footer className="sticky bottom-0 w-full">
              <Button
                onClick={handleConfirmDate}
                status={isValidDateTime(tempDate, time) ? 'normal' : 'disabled'}
              >
                선택
              </Button>
            </footer>
          </div>
        </BottomSheet>
      )}
    </>
  );
};

export default DateTimePicker;

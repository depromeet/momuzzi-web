import { Check } from 'lucide-react';
import Image from 'next/image';

import PeopleFillIcon from '@/app/_components/icons/PeopleFillIcon';
import StepIndicator from '@/app/_components/ui/StepIndicator';
import { cn } from '@/app/_lib/cn';
import { getProgressPercent } from '@/app/_utils/ui';

interface ParticipantProgressIndicatorProps {
  surveyCompletedParticipants: number;
  totalParticipants: number;
  className?: string;
  isSurveyClosed?: boolean;
}

const ParticipantProgressIndicator = ({
  surveyCompletedParticipants,
  totalParticipants,
  isSurveyClosed = false,
  className,
}: ParticipantProgressIndicatorProps) => {
  const progressPercent = getProgressPercent(surveyCompletedParticipants, totalParticipants);
  const clampedPercent = Math.max(14, Math.min(86, progressPercent));
  const trianglePercent = progressPercent < 14 ? 30 : progressPercent > 86 ? 70 : 50;

  const isEveryoneCompleted = surveyCompletedParticipants === totalParticipants;

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div className="flex items-center">
        <div className="flex-1">
          <div className="relative">
            <div
              className="absolute -top-11 -translate-x-1/2 transition-all"
              style={{ left: `${clampedPercent}%` }}
            >
              <div className="flex h-7 items-center justify-center gap-1 rounded-full bg-orange-100 px-2 py-0.5">
                <PeopleFillIcon
                  className={cn(
                    'text-orange-500',
                    isSurveyClosed && !isEveryoneCompleted && 'text-neutral-700'
                  )}
                />
                <span
                  className={cn(
                    'font-semibold text-orange-600',
                    isSurveyClosed && !isEveryoneCompleted && 'text-neutral-700'
                  )}
                >
                  {surveyCompletedParticipants}
                </span>
                <span className="font-semibold text-neutral-700">/</span>
                <span className="font-semibold text-neutral-700">{totalParticipants}</span>
              </div>

              <div
                className="absolute top-full left-1/2 -translate-x-1/2 transition-all"
                style={{ left: `${trianglePercent}%` }}
              >
                <div className="h-0 w-0 border-t-9 border-r-6 border-l-6 border-t-orange-100 border-r-transparent border-l-transparent" />
              </div>
            </div>

            <StepIndicator
              value={surveyCompletedParticipants}
              total={totalParticipants}
              progressColor={isSurveyClosed && !isEveryoneCompleted ? 'bg-neutral-500' : undefined}
              progressBgColor={
                isSurveyClosed && !isEveryoneCompleted
                  ? 'bg-gradient-to-r from-orange-300 to-orange-500'
                  : undefined
              }
            />
          </div>
        </div>

        <div className="z-1 -ml-6 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100">
          <Image alt="과녁 아이콘" src="/icons/arrow.svg" width={16} height={16} />
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <Check size={12} strokeWidth={4} className="rounded-full text-orange-500" />
          <div className="label-2 font-semibold text-orange-600">모임 만들기</div>
        </div>
        <div
          className={cn(
            'flex items-center gap-1 label-2 font-semibold',
            isSurveyClosed ? 'text-orange-500' : 'text-neutral-800'
          )}
        >
          {isSurveyClosed && <Check size={12} strokeWidth={4} className="rounded-full" />}
          식당 추천
        </div>
      </div>
    </div>
  );
};

export default ParticipantProgressIndicator;

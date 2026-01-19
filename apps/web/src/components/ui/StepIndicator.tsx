import { cn } from '@/lib/cn';
import { getProgressPercent } from '@/utils/ui';

interface StepIndicatorProps {
  value: number;
  total: number;
  progressColor?: string;
  progressBgColor?: string;
}

const StepIndicator = ({
  value,
  total,
  progressColor = 'bg-gradient-to-r from-orange-300 to-orange-500',
  progressBgColor = 'bg-orange-100',
}: StepIndicatorProps) => {
  const percent = getProgressPercent(value, total);

  return (
    <div className={cn('h-1 w-full overflow-hidden rounded-full', progressBgColor)}>
      <div
        className={cn('h-full transition-all', progressColor)}
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
};

export default StepIndicator;

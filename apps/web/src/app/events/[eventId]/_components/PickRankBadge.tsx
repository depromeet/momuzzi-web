import { cn } from '@/lib/cn';

interface PickRankBadgeProps {
  rank: number;
  className?: string;
}

const PickRankBadge = ({ rank, className }: PickRankBadgeProps) => {
  return (
    <div
      className={cn(
        'flex w-fit items-center gap-2 rounded-r-sm px-3 py-1 chip-gradient',
        className
      )}
    >
      <span className="flex h-4 w-4 items-center justify-center rounded-sm bg-black-alpha-2 label-1 font-extrabold text-white">
        {rank}
      </span>
      <span className="label-1 font-semibold text-white">우리 모임 Pick!</span>
    </div>
  );
};

export default PickRankBadge;

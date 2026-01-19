import { Minus, Plus } from 'lucide-react';

import { MEMBERS_SIZE } from '@/app/meetings/create/_models/constants';
import Input, { InputProps } from '@/components/ui/Input';
import { cn } from '@/lib/cn';

export interface StepperInputProps extends Omit<InputProps, 'type' | 'onChange'> {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

const StepperInput = ({
  value,
  onChange,
  min = MEMBERS_SIZE.MIN,
  max = MEMBERS_SIZE.MAX,
  className,
  ...props
}: StepperInputProps) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value) || min;
    onChange(newValue);
  };

  const handleIncrement = () => {
    onChange(value + 1);
  };

  const handleDecrement = () => {
    onChange(value - 1);
  };

  const canIncrement = value < max;
  const canDecrement = value > min;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleDecrement}
        disabled={!canDecrement}
        className={cn(
          'absolute top-4 left-3 z-10 flex h-5 w-5 cursor-pointer items-center justify-center rounded-sm transition-colors',
          canDecrement
            ? 'bg-neutral-300 text-neutral-1200'
            : 'cursor-not-allowed bg-neutral-200 text-neutral-400'
        )}
        aria-label="감소"
      >
        <Minus size={16} strokeWidth={2.5} />
      </button>

      <Input
        type="number"
        value={value}
        onChange={handleInputChange}
        readOnly
        min={min}
        max={max}
        showClearButton={false}
        className={cn(
          'p-3 pb-2 text-center text-xl focus:border-b-1 focus:border-b-neutral-300',
          className
        )}
        {...props}
      />

      <button
        type="button"
        onClick={handleIncrement}
        disabled={!canIncrement}
        className={cn(
          'absolute top-4 right-3 z-10 flex h-5 w-5 cursor-pointer items-center justify-center rounded-sm transition-colors',
          canIncrement
            ? 'bg-neutral-300 text-neutral-1200'
            : 'cursor-not-allowed bg-neutral-200 text-neutral-400'
        )}
        aria-label="증가"
      >
        <Plus size={16} strokeWidth={2.5} />
      </button>
    </div>
  );
};

export default StepperInput;

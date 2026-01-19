'use client';

import { useCountdownDisplay } from '@/hooks/useCountdownDisplay';

interface CountdownDisplayProps {
  endAt: string;
}

const CountdownDisplay = ({ endAt }: CountdownDisplayProps) => {
  const displayText = useCountdownDisplay(new Date(endAt));

  return <span className="label-1 font-medium text-orange-600">{displayText}</span>;
};

export default CountdownDisplay;

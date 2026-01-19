import { Plus } from 'lucide-react';

import { cn } from '@/lib/cn';

interface FloatingActionButtonProps {
  isOpen: boolean;
  onClick?: () => void;
  className?: string;
}

const FloatingActionButton = ({ isOpen, onClick, className }: FloatingActionButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'fixed right-5 bottom-10 z-999 flex h-15 w-15 cursor-pointer items-center justify-center rounded-full chip-gradient',
        className
      )}
      aria-label="모임 만들기"
      aria-expanded={isOpen}
    >
      <Plus
        size={32}
        className={cn('text-orange-50 transition-transform duration-200', isOpen && 'rotate-45')}
      />
    </button>
  );
};

export default FloatingActionButton;

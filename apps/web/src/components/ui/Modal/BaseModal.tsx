import { X } from 'lucide-react';

import { cn } from '@/lib/cn';

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  showCloseButton?: boolean;
  className?: string;
}

const BaseModal = ({
  isOpen,
  onClose,
  children,
  showCloseButton = false,
  className,
}: BaseModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      <div role="presentation" className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div
        className={cn(
          'relative flex w-full max-w-[310px] flex-col rounded-2xl bg-white p-4 pt-6',
          className
        )}
      >
        {showCloseButton && (
          <button
            onClick={onClose}
            className="flex items-center justify-end pb-3 text-neutral-1600"
            aria-label="모달 닫기"
          >
            <X size={24} strokeWidth={2} />
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default BaseModal;

import { X } from 'lucide-react';

import { cn } from '@/lib/cn';

interface BottomSheetProps {
  title?: string;
  showCloseButton?: boolean;
  onClose: () => void;
  children: React.ReactNode;
  heightClassName?: string;
}

const BottomSheet = ({
  title,
  showCloseButton = false,
  onClose,
  children,
  heightClassName = 'h-[90dvh]',
}: BottomSheetProps) => {
  return (
    <>
      <div role="presentation" className="fixed inset-0 z-40 bg-black/60" onClick={onClose} />
      <div
        className={cn(
          'no-scrollbar fixed bottom-0 left-1/2 z-50 flex w-full max-w-[475px] -translate-x-1/2 flex-col justify-between gap-4 overflow-auto rounded-t-2xl bg-white p-5',
          heightClassName
        )}
      >
        <div className="text-center">
          <p className="body-3 font-semibold text-orange-700">{title}</p>
          {showCloseButton && (
            <X
              onClick={onClose}
              size={24}
              strokeWidth={2.25}
              className="absolute top-5 right-4 cursor-pointer text-orange-800"
            />
          )}
        </div>
        {children}
      </div>
    </>
  );
};

export default BottomSheet;

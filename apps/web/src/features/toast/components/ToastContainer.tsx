'use client';

import { cn } from '@/lib/cn';

import { useToast } from '../hooks';

import { Toast } from './Toast';

const MAX_WIDTH = '475px';

const ToastContainer = () => {
  const { toasts, dismiss } = useToast();

  if (toasts.length === 0) {
    return null;
  }

  const topToasts = toasts.filter((toast) => toast.position === 'top');
  const bottomToasts = toasts.filter((toast) => toast.position === 'bottom');

  return (
    <>
      {/* Top 토스트들 */}
      {topToasts.length > 0 && (
        <div
          className={cn(
            'fixed top-0 z-50 flex max-h-screen w-full flex-col-reverse p-4',
            'pointer-events-none',
            `max-w-[${MAX_WIDTH}]`
          )}
          style={{
            width: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          {topToasts.map((toast) => (
            <Toast key={toast.id} toast={toast} onClose={dismiss} />
          ))}
        </div>
      )}

      {/* Bottom 토스트들 */}
      {bottomToasts.length > 0 && (
        <div
          className={cn(
            'fixed bottom-0 z-50 flex max-h-screen w-full flex-col-reverse p-4',
            'pointer-events-none',
            `max-w-[${MAX_WIDTH}]`
          )}
          style={{
            width: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          {bottomToasts.map((toast) => (
            <Toast key={toast.id} toast={toast} onClose={dismiss} />
          ))}
        </div>
      )}
    </>
  );
};

export { ToastContainer };

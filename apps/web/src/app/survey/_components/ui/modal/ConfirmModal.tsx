'use client';

import { cn } from '@/lib/cn';

interface ConfirmModalProps {
  open: boolean;
  title: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

/** ConfirmModal
 * - 공통 확인/취소 모달
 * - 설문 중 "건너뛰기" 동작에서 재사용
 * - open 여부에 따라 렌더링 제어
 */
const ConfirmModal = ({
  open,
  title,
  description,
  cancelText = '취소',
  confirmText = '확인',
  onCancel,
  onConfirm,
}: ConfirmModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 pt-[40vh]">
      <div className="flex w-[90%] max-w-sm flex-col rounded-2xl bg-white px-4 pb-4 shadow-lg">
        {/* 텍스트 영역 */}
        <div className="px-4 py-6 text-center text-neutral-1600">
          <p className="body-2 font-semibold">{title}</p>
          {description && <p className="mt-2 label-1 text-neutral-600">{description}</p>}
        </div>

        {/* 버튼 영역 */}
        <div className="flex w-full items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className={cn(
              'flex h-12 flex-1 cursor-pointer items-center justify-center rounded-xl bg-neutral-300 body-3 font-semibold text-neutral-1400 transition-colors hover:bg-neutral-400'
            )}
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className={cn(
              'flex h-12 flex-1 cursor-pointer items-center justify-center rounded-xl body-3 font-semibold text-white transition-opacity hover:opacity-90',
              'cta-gradient'
            )}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

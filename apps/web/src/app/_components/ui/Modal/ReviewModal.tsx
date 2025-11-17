'use client';
import { useEffect, useState } from 'react';

import { Star, X } from 'lucide-react';
import { createPortal } from 'react-dom';

import { cn } from '@/app/_lib/cn';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviewText: string;
  rating?: number;
  theme?: 'light' | 'dark';
}

const ReviewModal = ({
  isOpen,
  onClose,
  reviewText,
  rating,
  theme = 'light',
}: ReviewModalProps) => {
  const [mounted, setMounted] = useState(false);
  const isDark = theme === 'dark';

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // 모달 열릴 때 body 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* 백드롭 */}
      <div
        role="presentation"
        className="absolute inset-0 bg-black/60 backdrop-blur-xs"
        onClick={onClose}
      />

      {/* 모달 */}
      <div
        className={`relative w-full max-w-md ${isDark ? 'bg-neutral-1600' : 'bg-white'} rounded-2xl shadow-2xl`}
      >
        {/* 헤더 */}
        <div
          className={cn(
            'flex items-center justify-between border-b px-6 pt-4 pb-2',
            isDark ? 'border-neutral-1500' : 'border-neutral-100'
          )}
        >
          <div className="flex items-center gap-1">
            <h2 className={`subheading-2 font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              리뷰
            </h2>
            {rating && (
              <div className="flex items-center gap-1 rounded-full px-2 py-1">
                <Star size={14} fill="currentColor" className="text-yellow-500" />
                <span className="label-2 font-semibold text-yellow-600">{rating}</span>
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className={cn(
              'rounded-full p-1 transition-colors',
              isDark
                ? 'text-neutral-400 hover:bg-neutral-1500'
                : 'text-neutral-600 hover:bg-neutral-100'
            )}
            aria-label="모달 닫기"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        {/* 리뷰 내용 */}
        <div className="max-h-[60vh] overflow-y-auto px-6 py-5">
          <p
            className={cn(
              'body-3 leading-relaxed',
              isDark ? 'text-neutral-200' : 'text-neutral-700'
            )}
          >
            {reviewText}
          </p>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default ReviewModal;

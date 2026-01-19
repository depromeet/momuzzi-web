/**
 * 토스트 메시지 전역 상태 관리
 *
 * Zustand를 사용한 토스트 메시지 큐 관리
 * - 토스트 추가/제거
 * - 자동 타이머 관리
 * - 중복 방지 로직
 */

import { create } from 'zustand';

import type { Toast, ToastMessage, ToastOptions, ToastState } from './types';

const DEFAULT_DURATION = 2500;
const DEFAULT_POSITION = 'bottom';

/**
 * 고유한 토스트 ID 생성
 * @returns 고유 문자열 ID
 */
const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],

  addToast: (message: ToastMessage, options: ToastOptions = {}): string => {
    const {
      type = 'success',
      position = DEFAULT_POSITION,
      duration = DEFAULT_DURATION,
      preventDuplicate = false,
      showProgress = false,
      showIcon = true,
    } = options;

    const { toasts } = get();

    // 중복 방지 옵션이 활성화된 경우 중복 체크
    if (preventDuplicate) {
      const existingToast = toasts.find(
        (toast) => toast.message === message && toast.type === type
      );
      if (existingToast) {
        return existingToast.id;
      }
    }

    const id = generateId();
    const newToast: Toast = {
      id,
      message,
      type,
      position,
      duration,
      preventDuplicate,
      showProgress,
      showIcon,
    };

    set({ toasts: [...toasts, newToast] });

    // 시간이 0보다 큰 경우 handleShowIdToast 함수 호출
    if (duration > 0) {
      setTimeout(() => {
        get().removeToast(id);
      }, duration);
    }

    return id;
  },

  removeToast: (id: string): void => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },

  clearToasts: (): void => {
    set({ toasts: [] });
  },
}));

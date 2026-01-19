import { useCallback } from 'react';

import { useToastStore } from './store';

import type { ToastMessage, ToastOptions } from './types';

/**
 * 토스트 메시지를 표시하고 관리하는 훅
 *
 * @example
 * ```tsx
 * const { success, error, warning, info, loading, dismiss } = useToast();
 *
 * // 기본 사용법
 * toast('토스트 메시지'); // 기본값 info
 * success('저장되었습니다!');
 *
 *
 * // 옵션과 함께 사용
 * info('업데이트가 있습니다.', {
 *   position: 'top', // 기본값 'bottom'
 *   duration: 5000, // 기본값 4000
 *   showProgress: true, // 기본값 false
 *   preventDuplicate: true, // 기본값 false
 *   showIcon: true, // 기본값 true
 * });
 *
 * ```
 *
 * @returns 토스트 관리 메서드들과 현재 토스트 목록
 */
export const useToast = () => {
  const { addToast, removeToast, clearToasts, toasts } = useToastStore();

  /**
   * 커스텀 토스트 메시지 표시(기본값: info)
   * 일반적인 토스트로 사용할 수 있습니다. type 옵션을 통해 토스트 타입을 설정할 수 있습니다.
   * @param message - 표시할 메시지
   * @param options - 토스트 옵션 (타입, 위치, 지속시간 등)
   * @returns 토스트 ID
   */
  const toast = useCallback(
    (message: ToastMessage, options?: ToastOptions) => {
      return addToast(message, options);
    },
    [addToast]
  );

  /**
   * 성공 토스트 메시지 표시 (초록색)
   * @param message - 표시할 성공 메시지
   * @param options - 추가 옵션 (위치, 지속시간, 액션 등)
   * @returns 토스트 ID
   */
  const success = useCallback(
    (message: ToastMessage, options?: Omit<ToastOptions, 'type'>) => {
      return addToast(message, { ...options, type: 'success' });
    },
    [addToast]
  );

  /**
   * 에러 토스트 메시지 표시 (빨간색)
   * @param message - 표시할 에러 메시지
   * @param options - 추가 옵션 (위치, 지속시간, 액션 등)
   * @returns 토스트 ID
   */
  const error = useCallback(
    (message: ToastMessage, options?: Omit<ToastOptions, 'type'>) => {
      return addToast(message, { ...options, type: 'error' });
    },
    [addToast]
  );

  /**
   * 경고 토스트 메시지 표시 (노란색)
   * @param message - 표시할 경고 메시지
   * @param options - 추가 옵션 (위치, 지속시간, 액션 등)
   * @returns 토스트 ID
   */
  const warning = useCallback(
    (message: ToastMessage, options?: Omit<ToastOptions, 'type'>) => {
      return addToast(message, { ...options, type: 'warning' });
    },
    [addToast]
  );

  /**
   * 정보 토스트 메시지 표시 (파란색)
   * @param message - 표시할 정보 메시지
   * @param options - 추가 옵션 (위치, 지속시간, 액션 등)
   * @returns 토스트 ID
   */
  const info = useCallback(
    (message: ToastMessage, options?: Omit<ToastOptions, 'type'>) => {
      return addToast(message, { ...options, type: 'info' });
    },
    [addToast]
  );

  /**
   * 특정 토스트 제거
   * @param id - 제거할 토스트 ID
   */
  const dismiss = useCallback(
    (id: string) => {
      removeToast(id);
    },
    [removeToast]
  );

  /**
   * 모든 토스트 제거
   */
  const dismissAll = useCallback(() => {
    clearToasts();
  }, [clearToasts]);

  return {
    /** 커스텀 토스트 표시 */
    toast,
    /** 성공 토스트 표시 */
    success,
    /** 에러 토스트 표시 */
    error,
    /** 경고 토스트 표시 */
    warning,
    /** 정보 토스트 표시 */
    info,
    /** 특정 토스트 제거 */
    dismiss,
    /** 모든 토스트 제거 */
    dismissAll,
    /** 현재 표시 중인 토스트 목록 */
    toasts,
  };
};

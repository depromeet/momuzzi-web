/**
 * 토스트 메시지 타입 정의
 */

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export type ToastPosition = 'top' | 'bottom';

export type ToastMessage = string | React.ReactNode;

/**
 * 개별 토스트 메시지 인터페이스
 */
export interface Toast {
  /** 고유 식별자 */
  id: string;
  /** 표시할 메시지 */
  message: ToastMessage;
  /** 토스트 타입 (색상/아이콘 결정) */
  type: ToastType;
  /** 표시 위치 (기본값: 'bottom') */
  position?: ToastPosition;
  /** 자동 제거 시간(ms), 0이면 수동 제거 (기본값: 4000) */
  duration?: number;
  /** 동일한 메시지 중복 표시 방지 */
  preventDuplicate?: boolean;
  /** 진행 바 표시 여부 (기본값: false) */
  showProgress?: boolean;
  /** 아이콘 여부 (기본값: true) */
  showIcon?: boolean;
}

/**
 * 토스트 생성 옵션
 */
export interface ToastOptions {
  /** 토스트 타입 (기본값: 'info') */
  type?: ToastType;
  /** 표시 위치 (기본값: 'bottom') */
  position?: ToastPosition;
  /** 자동 제거 시간(ms), 0이면 수동 제거 (기본값: 4000) */
  duration?: number;
  /** 동일한 메시지 중복 표시 방지 (기본값: false) */
  preventDuplicate?: boolean;
  /** 진행 바 표시 여부 (기본값: true) */
  showProgress?: boolean;
  /** 아이콘 여부 (기본값: true) */
  showIcon?: boolean;
}

/**
 * 토스트 스토어 상태 인터페이스
 */
export interface ToastState {
  /** 현재 표시 중인 토스트 목록 */
  toasts: Toast[];
  /** 새 토스트 추가 */
  addToast: (message: ToastMessage, options?: ToastOptions) => string;
  /** 특정 토스트 제거 */
  removeToast: (id: string) => void;
  /** 모든 토스트 제거 */
  clearToasts: () => void;
}

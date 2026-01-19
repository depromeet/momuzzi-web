# 🍞 Toast Feature

토스트 메시지 피처 - React/Next.js 환경에서 사용할 수 있는 토스트 시스템
Next.js 대응 위한 ToastProvider 제공

## ✨ Features

- **4가지 토스트 타입**: `success`, `error`, `warning`, `info`
- **위치 설정**: `top`, `bottom` 지원
- **자동/수동 제거**: 시간 기반 자동 제거 및 수동 제거
- **진행 바**: 남은 시간 시각적 표시
- **중복 방지**: 동일한 메시지 중복 표시 방지
- **모바일 친화적**: 스와이프 제거 지원
- **메시지 타입**: 문자열(string)과 ReactNode 모두 지원
- **아이콘 제어**: 아이콘 표시/숨김 설정 가능
- **TypeScript**: 완전한 타입 안전성
- **CVA 패턴**: Class Variance Authority로 스타일 관리

## 🚀 Quick Start

### 1. Provider 설정

```tsx
// app/layout.tsx
import { ToastProvider } from '@/app/_features/toast';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
```

### 2. 기본 사용법

```tsx
import { useToast } from '@/app/_features/toast';

function MyComponent() {
  const { success, error, warning, info } = useToast();

  return (
    <div>
      <button onClick={() => success('성공!')}>Success</button>
      <button onClick={() => error('오류 발생!')}>Error</button>
      <button onClick={() => warning('주의하세요!')}>Warning</button>
      <button onClick={() => info('정보입니다')}>Info</button>
    </div>
  );
}
```

## 📖 Advanced Usage

### 커스텀 옵션

```tsx
const { toast } = useToast();

// 커스텀 토스트
toast('커스텀 메시지', {
  type: 'success',
  position: 'top',
  duration: 5000,
  showProgress: true,
  preventDuplicate: true,
  showIcon: true,
});
```

### 텍스트 메시지

```tsx
const { success } = useToast();

// 기본 텍스트 메시지
success('저장되었습니다!');
success('파일이 업로드되었습니다.');
```

### ReactNode 메시지

```tsx
const { success, error } = useToast();

// JSX 메시지
success(
  <div className="flex items-center gap-2">
    <CheckIcon className="h-5 w-5" />
    <span>저장되었습니다!</span>
  </div>
);

// 링크가 포함된 메시지
success(
  <div>
    <p>파일이 업로드되었습니다.</p>
    <a href="/files" className="text-blue-500 underline">
      파일 보기
    </a>
  </div>
);

// 버튼이 포함된 메시지
error(
  <div className="flex items-center justify-between">
    <span>오류가 발생했습니다</span>
    <button className="text-sm underline" onClick={() => window.location.reload()}>
      새로고침
    </button>
  </div>
);
```

### 아이콘 제어

```tsx
const { success, error } = useToast();

// 아이콘과 함께 (기본값)
success('저장되었습니다!', { showIcon: true });

// 아이콘 없이
error('오류가 발생했습니다.', { showIcon: false });

// 커스텀 아이콘 (ReactNode 사용)
success(
  <div className="flex items-center gap-2">
    <CustomIcon className="h-5 w-5" />
    <span>커스텀 아이콘과 함께</span>
  </div>,
  { showIcon: false } // 기본 아이콘 숨김
);
```

### 수동 제거

```tsx
const { toast, dismiss } = useToast();

// 수동 제거 토스트
const toastId = toast('중요한 알림', { duration: 0 });

// 3초 후 제거
setTimeout(() => {
  dismiss(toastId);
}, 3000);
```

### 중복 방지

```tsx
const { success } = useToast();

// 동일한 메시지는 한 번만 표시
success('저장 완료', { preventDuplicate: true });
success('저장 완료', { preventDuplicate: true }); // 무시됨
```

## 🎨 Customization

### CVA 패턴으로 스타일 커스터마이징

```tsx
// components/Toast.tsx에서 수정
const toastVariants = cva('base-classes', {
  variants: {
    variant: {
      success: 'border-green-200 bg-green-50 text-green-800',
      error: 'border-red-200 bg-red-50 text-red-800',
      warning: 'border-yellow-200 bg-yellow-50 text-yellow-800',
      info: 'border-blue-200 bg-blue-50 text-blue-800',
    },
  },
});
```

## 🔧 API Reference

### `useToast()`

토스트 메시지 관리 훅

**Returns:**

- `toast(message, options)` - 커스텀 토스트 표시
- `success(message, options)` - 성공 토스트 표시
- `error(message, options)` - 에러 토스트 표시
- `warning(message, options)` - 경고 토스트 표시
- `info(message, options)` - 정보 토스트 표시
- `dismiss(id)` - 특정 토스트 제거
- `dismissAll()` - 모든 토스트 제거
- `toasts` - 현재 토스트 목록

### `ToastOptions`

```tsx
interface ToastOptions {
  type?: 'success' | 'error' | 'warning' | 'info';
  position?: 'top' | 'bottom';
  duration?: number; // ms, 0이면 수동 제거
  preventDuplicate?: boolean;
  showProgress?: boolean;
  showIcon?: boolean; // 아이콘 표시 여부 (기본값: true)
}
```

### `ToastMessage`

```tsx
type ToastMessage = string | React.ReactNode;
```

## 🏗️ Architecture

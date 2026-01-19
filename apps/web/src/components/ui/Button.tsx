import { type ButtonHTMLAttributes } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/cn';

const buttonVariants = cva(
  'flex w-full shrink-0 cursor-pointer items-center justify-center rounded-[0.875rem] py-5 body-3 font-semibold transition-all duration-200 active:opacity-80',
  {
    variants: {
      theme: {
        'cta-gradient': 'cta-gradient text-white select-none',
        orange: 'bg-orange-500 text-white select-none',
        'orange-light': 'bg-orange-100 text-orange-600 ',
        gray: 'text-neutral-1400 bg-neutral-300 select-none',
      },
      status: {
        normal: '',
        disabled: 'bg-orange-200 cursor-not-allowed pointer-events-none',
      },
    },
    defaultVariants: {
      theme: 'cta-gradient',
      status: 'normal',
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

/**
 * 재사용 가능한 Button 컴포넌트
 *
 * @description CVA를 사용하여 theme과 status 변형을 타입 안전하게 관리하는 버튼 컴포넌트입니다.
 *
 * @example
 * ```tsx
 * // 기본 사용
 * <Button>기본 버튼</Button>
 *
 * // 테마 변경
 * <Button theme="gray">회색 버튼</Button>
 *
 * // 상태 변경
 * <Button status="disabled">비활성화</Button>
 *
 * // HTML 속성 사용
 * <Button type="submit" onClick={() => {}}>
 *   제출
 * </Button>
 *
 * // 커스텀 스타일
 * <Button className="bg-blue-500 text-white">
 *   커스텀
 * </Button>
 * ```
 *
 * @param theme - 버튼 색상 테마 ('cta-gradient'| 'orange' | 'orange-light' | 'gray')
 * @param status - 버튼 상태 ('normal' | 'disabled')
 * @param children - 버튼 내부 콘텐츠
 * @param className - 추가 CSS 클래스 (variant 스타일과 병합됨)
 * @param props - 모든 HTML button 속성 지원 (type, onClick, disabled 등)
 *
 * @returns JSX.Element
 */
const Button = ({ className, theme, status, children, ...props }: ButtonProps) => {
  const isDisabled = status === 'disabled';
  return (
    <button
      className={cn(buttonVariants({ theme: isDisabled ? 'orange' : theme, status }), className)}
      disabled={isDisabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

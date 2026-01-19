'use client';
import { motion } from 'framer-motion';

import useMarquee from './hooks/useMarquee';

type MarqueeTextProps = {
  children: string;
  className?: string;
  durationPerPx?: number; // px당 소요시간(초) 기본 0.03
  minDuration?: number; // 최소 전체 시간(초) 기본 6
  pauseOnHover?: boolean; // 호버시 멈춤
};

/**
 * MarqueeText
 * 길이가 넘치는 단일 라인의 텍스트를 자동으로 좌↔우로 부드럽게 스크롤시켜 보여줍니다.
 *
 * 사용 예시:
 * <MarqueeText className="text-sm font-medium">아주아주긴텍스트…</MarqueeText>
 *
 * props
 * - children: 표시할 텍스트(한 줄)
 * - className?: 텍스트에 적용할 추가 클래스
 * - durationPerPx?: px 당 애니메이션 시간(초). 기본 0.03
 * - minDuration?: 최소 애니메이션 시간(초). 기본 6
 * - pauseOnHover?: 호버 시 일시정지. 기본 true
 */
const MarqueeText = ({
  children,
  className,
  durationPerPx = 0.03,
  minDuration = 6,
  pauseOnHover = true,
}: MarqueeTextProps) => {
  const { containerRef, textRef, delta, isOverflow } = useMarquee(children);
  const total = Math.max(minDuration, delta * durationPerPx);

  return (
    <div ref={containerRef} className="w-full overflow-hidden">
      <motion.span
        ref={textRef}
        className={`block whitespace-nowrap ${className ?? ''}`}
        animate={isOverflow ? { x: [0, -delta, 0] } : { x: 0 }}
        transition={isOverflow ? { duration: total, ease: 'linear', repeat: Infinity } : undefined}
        {...(pauseOnHover ? { whileHover: { x: 0, transition: { duration: 0 } } } : {})}
      >
        {children}
      </motion.span>
    </div>
  );
};

export default MarqueeText;

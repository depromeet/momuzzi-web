'use client';
import { useEffect, useRef, useState } from 'react';

function useMarquee(text?: string) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [delta, setDelta] = useState(0); // 넘치는 길이(px)
  const [isOverflow, setIsOverflow] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    const textElement = textRef.current;
    if (!element || !textElement) return;

    const measure = () => {
      setTimeout(() => {
        const delta = textElement.scrollWidth - element.clientWidth;
        setDelta(delta > 0 ? delta : 0);
        setIsOverflow(delta > 0);
      }, 10);
    };

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(element);
    ro.observe(textElement);
    return () => ro.disconnect();
  }, [text]); // 텍스트 변경 시 재측정

  return { containerRef, textRef, delta, isOverflow };
}

export default useMarquee;

import { useCallback } from 'react';

import confetti from 'canvas-confetti';

const COLORS = ['#3369FF', '#FFB218', '#FF4040'];
const DEFAULT_CONFETTI_DURATION = 1500;
const DEFAULT_CONFETTI_SETTING = {
  particleCount: 100,
  spread: 100,
  origin: { y: 1.5 },
  colors: COLORS,
};

export const useConfetti = () => {
  const getRandomInRange = useCallback((min: number, max: number) => {
    return Math.random() * (max - min) + min;
  }, []);

  const celebrate = useCallback(() => {
    const confettiAnimationEnd = Date.now() + DEFAULT_CONFETTI_DURATION;

    const interval = setInterval(() => {
      const timeLeft = confettiAnimationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / DEFAULT_CONFETTI_DURATION);
      confetti({
        ...DEFAULT_CONFETTI_SETTING,
        particleCount,
        origin: {
          x: getRandomInRange(0.1, 0.9),
          y: Math.random() - 0.2,
        },
      });
    }, 250);

    return () => clearInterval(interval);
  }, [getRandomInRange]);

  return { celebrate };
};

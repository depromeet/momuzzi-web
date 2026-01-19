import { useEffect, useState } from 'react';

const COUNTDOWN_ENDED_TEXT = '종료됨';

/**
 * 남은 시간을 계산하고 포맷팅
 * @param targetTime - 종료 시간
 * @returns 포맷팅된 남은 시간 문자열 또는 종료 표시
 */
const calculateTimeLeft = (targetTime: Date): string => {
  const now = new Date().getTime();
  const end = targetTime.getTime();
  const diff = end - now;

  if (diff <= 0) return COUNTDOWN_ENDED_TEXT;

  const msPerDay = 1000 * 60 * 60 * 24;
  const msPerHour = 1000 * 60 * 60;
  const msPerMinute = 1000 * 60;

  const days = Math.floor(diff / msPerDay);
  const hours = Math.floor((diff % msPerDay) / msPerHour);
  const minutes = Math.floor((diff % msPerHour) / msPerMinute);
  const seconds = Math.floor((diff % msPerMinute) / 1000);

  return `${days}일 ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

/**
 * 카운트다운 시간을 실시간으로 계산
 * @param targetTime - 종료 시간
 * @returns 포맷팅된 남은 시간 문자열
 */
export const useCountdownDisplay = (targetTime: Date): string => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    setDisplayText(calculateTimeLeft(targetTime));

    const interval = setInterval(() => {
      const time = calculateTimeLeft(targetTime);
      setDisplayText(time);

      if (time === COUNTDOWN_ENDED_TEXT) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  return displayText;
};

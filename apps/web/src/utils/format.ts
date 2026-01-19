/**
 * ISO 날짜 문자열을 한국 형식으로 변환
 * @param dateString - ISO 8601 형식 ("2025-10-20T12:02:00")
 * @returns 포맷된 날짜 ("2025.10.20(월) 오후 12:02")
 */
export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    console.error('잘못된 날짜 형식:', dateString);
    return dateString;
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const weekday = weekdays[date.getDay()];

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const period = hours >= 12 ? '오후' : '오전';

  hours = hours % 12 || 12;

  return `${year}.${month}.${day}(${weekday}) ${period} ${hours}:${minutes}`;
};

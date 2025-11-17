/**
 * 24시간 형식(HH)을 12시간 형식(hour, period)으로 변환
 * @param time - "18" 형식의 24시간 문자열
 * @returns { hour: 06, period: '오전' | '오후' }
 */
export const convertTo12HourFormat = (
  time?: string | null
): { hour: number; period: '오전' | '오후' } => {
  if (!time) {
    return { hour: 1, period: '오전' };
  }

  const hourNumber = parseInt(time, 10);

  if (hourNumber === 0) {
    return { hour: 12, period: '오전' };
  }
  if (hourNumber < 12) {
    return { hour: hourNumber, period: '오전' };
  }
  if (hourNumber === 12) {
    return { hour: 12, period: '오후' };
  }
  return { hour: hourNumber - 12, period: '오후' };
};

/**
 * 24시간 형식(HH)을 "오전/오후 시간" 형식의 문자열로 변환
 * @param time - "04" 형식의 24시간 문자열
 * @returns "오전 4시" 형식의 문자열
 */
export const formatTimeDisplay = (time: string | null): string => {
  if (!time) {
    return '시간 선택하기';
  }

  const hour = parseInt(time, 10);
  const period = hour < 12 ? '오전' : '오후';
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${period} ${displayHour}시`;
};

/**
 * 날짜/시간 초기값 계산 (현재 시간 기준 +1일)
 * @returns "날짜 초기값, 시간 초기값"
 */
export const getDefaultDateTime = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (tomorrow.getMinutes() > 0) {
    tomorrow.setHours(tomorrow.getHours() + 1);
  }

  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const date = String(tomorrow.getDate()).padStart(2, '0');
  const defaultDate = `${year}-${month}-${date}`;

  const hour = String(tomorrow.getHours()).padStart(2, '0');
  const defaultTime = hour;

  return { defaultDate, defaultTime };
};

/**
 * 날짜와 시간이 현재 시간으로부터 2시간 이후인지 확인
 * @param date - "YYYY-MM-DD" 형식의 날짜 문자열
 * @param time - "HH" 형식의 24시간 시간 문자열
 * @returns 현재 시간 이후이면 true, 그 외에는 false
 */
export const isValidDateTime = (date: string | null, time: string | null): boolean => {
  if (!date || !time) return false;

  const now = new Date();
  const selectedDateTime = new Date(`${date}T${time}:00:00`);

  // 현재 시간 + 2시간
  const minDateTime = new Date(now.getTime() + 2 * 60 * 60 * 1000);

  return selectedDateTime >= minDateTime;
};

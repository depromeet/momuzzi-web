import { ERROR_CODES } from '@/data/constants/errorCodes';
import { ApiError } from '@/data/models/api';

/**
 * 이미 참가한 모임 에러인지 확인
 * @param error - API 에러 객체
 * @returns 이미 참가한 모임 여부
 */
export const isAlreadyJoined = (error: ApiError): boolean => {
  return error.code === ERROR_CODES.MEETING_ALREADY_JOINED;
};

/**
 * 모임 관련 진입 불가 에러인지 확인 (홈 리다이렉트 필요)
 * @param error - API 에러 객체
 * @returns 진입 불가 여부
 */
export const isAccessDenied = (error: ApiError): boolean => {
  const accessDeniedCodes = [
    ERROR_CODES.MEETING_NOT_FOUND,
    ERROR_CODES.MEETING_ENDED,
    ERROR_CODES.MEETING_FULL,
    ERROR_CODES.TOKEN_INVALID_FORMAT,
    ERROR_CODES.TOKEN_INVALID_MEETING_ID,
  ] as const;

  return accessDeniedCodes.includes(error.code as (typeof accessDeniedCodes)[number]);
};

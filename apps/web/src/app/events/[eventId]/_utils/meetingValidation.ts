import { redirect } from 'next/navigation';

import { ApiError } from '@/data/models/api';
import { meetingsApi } from '@/services/meetings';
import { isAccessDenied, isAlreadyJoined } from '@/utils/errorGuards';

/**
 * 초대 토큰 검증 및 모임 참여 처리
 *
 * @param eventId - 이벤트(모임) ID
 * @param token - 초대 토큰
 * @throws 진입 불가능한 에러인 경우 리다이렉트
 *
 * @example
 * ```ts
 * // 레이아웃이나 페이지에서 사용
 * if (token) {
 *   await validateTokenAndJoin(eventId, token);
 * }
 * ```
 */
export const validateTokenAndJoin = async (eventId: string, token: string): Promise<void> => {
  try {
    await meetingsApi.validateToken(token);
    await meetingsApi.joinMeeting(token);
  } catch (error) {
    const apiError = error as ApiError;

    // 이미 참가한 경우는 정상 처리
    if (isAlreadyJoined(apiError)) {
      return;
    }

    // 접근 불가 에러는 홈으로 리다이렉트
    if (isAccessDenied(apiError)) {
      redirect(`/?error=${apiError.code}`);
    }

    // 기타 에러는 홈으로 리다이렉트
    redirect('/');
  }
};

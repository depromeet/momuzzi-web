/**
 * API 인터셉터 유틸리티
 * - 액세스 토큰 만료 시, 리프레시 토큰으로 갱신
 * - 401 발생 시 자동 재시도
 */

interface FetchErrorResponse {
  errorMessage: string;
  shouldLogout?: boolean;
}

/**
 * refreshToken을 사용하여 accessToken, refreshToken 갱신
 * @returns 새로운 accessToken, refreshToken 또는 실패 시 null
 */
export const refreshTokens = async (): Promise<{
  newAccessToken: string;
  newRefreshToken: string;
} | null> => {
  const isServer = typeof window === 'undefined';

  if (isServer) {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!refreshToken) {
      return null;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reissue-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        console.error('토큰 갱신 실패:', response.status);
        return null;
      }

      const { data: { accessToken: newAccessToken, refreshToken: newRefreshToken } = {} } =
        await response.json();

      cookieStore.set('accessToken', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 3600,
      });

      cookieStore.set('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 604800,
      });

      return { newAccessToken, newRefreshToken };
    } catch (error) {
      console.error('토큰 갱신 중 에러 발생:', error);
      return null;
    }
  }

  return null;
};

/**
 * 401 응답 시 자동으로 토큰 갱신 후 재시도
 * @param fetchFn - 실행할 fetch 함수
 * @returns Response 객체
 * @example
 * const response = await withTokenRefresh(async () => {
 *   return fetch('/api/meetings', { headers: { Authorization: `Bearer ${token}` } });
 * });
 */
export const withTokenRefresh = async (
  fetchFn: (token?: string) => Promise<Response>
): Promise<Response> => {
  const response = await fetchFn();

  if (response.status === 401) {
    const newTokens = await refreshTokens();

    if (!newTokens) {
      return new Response(
        JSON.stringify({
          errorMessage: '인증이 만료되었습니다. 다시 로그인해주세요',
          shouldLogout: true,
        } as FetchErrorResponse),
        { status: 401 }
      );
    }

    return fetchFn(newTokens.newAccessToken);
  }

  return response;
};

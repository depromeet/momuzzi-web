/**
 * 카카오 OAuth code를 API Routes로 전달
 * @param code - 카카오로부터 받은 인가 코드(code)
 */
export const exchangeCodeForCookie = async (code: string) => {
  const redirectUrl = window.location.origin;
  const params = new URLSearchParams({ code, redirect_uri: `${redirectUrl}/auth/callback` });
  const response = await fetch(`/api/auth/kakao/callback?${params}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('API Routes 에러 응답:', errorText);
    throw new Error(`쿠키 교환에 실패하였습니다: ${response.status}`);
  }
};

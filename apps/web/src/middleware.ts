import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

const AUTH_PAGES = ['/login'];
const PROTECTED_ROUTES = ['/meetings', '/events', '/survey']; // TODO: 일관된 폴더 구조로 변경 필요

const middleware = async (req: NextRequest) => {
  if (req.nextUrl.pathname === '/healthz') {
    return NextResponse.next();
  }

  const accessToken = req.cookies.get('accessToken')?.value;
  const refreshToken = req.cookies.get('refreshToken')?.value;
  const { pathname } = req.nextUrl;

  const isProtected =
    pathname === '/' || PROTECTED_ROUTES.some((route) => pathname.startsWith(route));

  if (isProtected) {
    if ((!accessToken || isTokenExpired(accessToken)) && refreshToken) {
      const newTokens = await refreshTokens(refreshToken);

      if (newTokens) {
        const response = NextResponse.next();
        response.cookies.set('accessToken', newTokens.newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: 3600,
        });
        response.cookies.set('refreshToken', newTokens.newRefreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: 604800,
        });
        return response;
      }

      const loginUrl = new URL('/login', req.url);
      if (pathname !== '/') {
        const redirectTo = `${pathname}${req.nextUrl.search}`;
        loginUrl.searchParams.set('redirectTo', redirectTo);
      }
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete('accessToken');
      response.cookies.delete('refreshToken');
      return response;
    }

    if (!accessToken) {
      const redirectTo = `${pathname}${req.nextUrl.search}`;
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('redirectTo', redirectTo);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (AUTH_PAGES.includes(pathname) && accessToken && !isTokenExpired(accessToken)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images|uploads|pdf|api).*)'],
};

const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now() + 5 * 60 * 1000;
  } catch {
    return true;
  }
};

const refreshTokens = async (
  refreshToken: string
): Promise<{ newAccessToken: string; newRefreshToken: string } | null> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort('갱신 요청 타임아웃(3초) 에러'), 3000);

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reissue-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
      signal: controller.signal,
    });

    if (!response.ok) {
      console.error('토큰 갱신 실패:', response.status);
      return null;
    }

    const { data: { accessToken: newAccessToken, refreshToken: newRefreshToken } = {} } =
      await response.json();

    return { newAccessToken, newRefreshToken };
  } catch (error) {
    console.error('토큰 갱신 중 에러 발생:', error);
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
};

export default middleware;

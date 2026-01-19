import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { withTokenRefresh } from '@/lib/api';

const BACKEND_API = process.env.NEXT_PUBLIC_API_URL!;

/**
 * 공통 API Routes
 * - accessToken 자동 포함
 * - 401 발생 시 자동 토큰 갱신
 */
const handler = async (
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> | { path: string[] } }
) => {
  try {
    const params = await context.params;
    const targetPath = `/${params.path.join('/')}`;
    const queryString = req.nextUrl.searchParams.toString();

    const response = await withTokenRefresh(async (newToken?: string) => {
      const cookieStore = await cookies();
      const accessToken = newToken || cookieStore.get('accessToken')?.value;

      if (!accessToken) {
        return new Response(JSON.stringify({ errorMessage: '인증 토큰이 없습니다' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const url = `${BACKEND_API}${targetPath}?${queryString}`;
      const headers: Record<string, string> = {
        Authorization: `Bearer ${accessToken}`,
      };

      const contentType = req.headers.get('content-type');
      if (contentType) headers['Content-Type'] = contentType;

      const body = ['GET'].includes(req.method) ? undefined : await req.text();

      return fetch(url, {
        method: req.method,
        headers,
        body,
      });
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }

    const responseBody = await response.text();
    const nextResponse = new NextResponse(responseBody, { status: response.status });

    return nextResponse;
  } catch (error) {
    console.error('API Routes 프록시 내부 에러: ', error);
    return NextResponse.json(
      { errorMessage: '프록시 요청 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;

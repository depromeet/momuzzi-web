export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

/**
 * API 요청 옵션
 * @template B - 요청 body 타입
 * @property params - URL 쿼리 파라미터 (예: ```{ id: 1, name: 'test' } → ?id=1&name=test)```
 * @property body - 요청 body 데이터 (POST/PUT/PATCH에서 사용)
 */
export interface FetchOptions<B = unknown> extends Omit<RequestInit, 'method' | 'body'> {
  params?: Record<string, string | number | boolean | null | undefined>;
  body?: B;
}

/**
 * 백엔드 API 성공 응답 형식
 * @template T - 실제 응답 데이터 타입
 */
export interface ApiSuccessResponse<T> {
  data: T;
  error: null;
}

/**
 * 백엔드 API 에러 응답 형식
 */
export interface ApiErrorResponse {
  data: null;
  error: {
    name: string;
    code: string;
    message: string;
    detail: unknown;
  };
}

/**
 * API 에러 객체 (throw될 때 사용)
 * - fetchWithToken에서 response.ok가 false일 때 throw됨
 * - 서버/클라이언트 공통 에러 형식
 */
export interface ApiError {
  status: number;
  message: string;
  code?: string;
  name?: string;
  detail?: unknown;
}

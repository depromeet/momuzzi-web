import { useCallback, useEffect, useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';
import { usePathname, useSearchParams } from 'next/navigation';

import { getInviteTokenQueryOptions } from '@/data/queries/inviteToken';
import { useToast } from '@/features/toast';
import { initKakaoSDK, shareKakaoLink } from '@/lib/kakao';

interface UseCopyClipBoardProps {
  meetingId: number;
}

const addTokenToUrl = (url: string, token: string): string => {
  try {
    const urlObj = new URL(url);
    urlObj.searchParams.set('token', token);
    return urlObj.toString();
  } catch {
    // 상대 경로나 URL 파싱 실패 시 기본 동작
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}token=${token}`;
  }
};

/**
 * 클립보드 복사 및 카카오톡 공유 훅
 * @returns {Object} - 클립보드 복사 및 카카오톡 공유 함수
 * @returns {Function} handleCopyUrl - 클립보드 복사 함수
 * @returns {Function} handleShareKakao - 카카오톡 공유 함수
 */
const useCopyClipBoard = ({ meetingId }: UseCopyClipBoardProps) => {
  const { success: successToast, error: errorToast } = useToast();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const hasTokenParam = useMemo(() => !!searchParams.get('token'), [searchParams]);

  const currentUrl = useMemo(() => {
    if (typeof window === 'undefined') return '';

    const { origin } = window.location;
    const search = searchParams.toString();
    const queryString = search ? `?${search}` : '';

    return `${origin}${pathname}${queryString}`;
  }, [pathname, searchParams]);

  const { data: token } = useQuery({
    ...getInviteTokenQueryOptions(meetingId),
    enabled: !hasTokenParam,
  });

  useEffect(() => {
    initKakaoSDK();
  }, []);

  const shareUrlWithToken = useMemo(() => {
    if (!currentUrl) return '';

    // 이미 토큰이 URL에 포함되어 있으면 그대로 사용
    if (hasTokenParam) {
      return currentUrl;
    }

    // 서버에서 받은 토큰이 있으면 URL에 추가
    if (token) {
      return addTokenToUrl(currentUrl, token);
    }

    // 토큰이 없으면 현재 URL만 반환
    return currentUrl;
  }, [currentUrl, token, hasTokenParam]);

  const handleCopyUrl = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrlWithToken);
      successToast(`참여 링크가 복사되었어요.\n공유해서 참여를 독촉해보세요.`, { duration: 2500 });
    } catch (err) {
      console.error('URL 복사 실패:', err);
      errorToast('링크 복사에 실패했습니다.', { duration: 2500 });
    }
  }, [shareUrlWithToken, successToast, errorToast]);

  const handleShareKakao = useCallback(() => {
    shareKakaoLink(shareUrlWithToken);
  }, [shareUrlWithToken]);

  return { handleCopyUrl, handleShareKakao };
};

export default useCopyClipBoard;

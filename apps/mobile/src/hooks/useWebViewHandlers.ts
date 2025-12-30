import { RefObject, useCallback } from 'react';

import * as Linking from 'expo-linking';
import { WebView } from 'react-native-webview';
interface UseWebViewHandlersProps {
  webViewRef: RefObject<WebView | null>;
  webAppUrl: string;
}

const AUTH_PROVIDER_HOSTS = ['kauth.kakao.com', 'accounts.kakao.com'];
/**
 * @description WebView 관련 핸들러들을 제공하는 커스텀 훅으로,
 * WebView의 페이지 로드 요청 처리 및 에러 발생 시 동작을 정의합니다.
 *
 * @author 박희진
 */

export const useWebViewHandlers = ({ webViewRef, webAppUrl }: UseWebViewHandlersProps) => {
  /**
   * @description WebView에서 페이지 로드를 시작하기 전에 호출되는 핸들러로,
   * 웹앱 URL, 카카오 로그인 관련 URL은 WebView에서 처리하고, 그 외 외부 링크는 기본 브라우저에서 처리합니다.
   */
  const handleShouldStartLoadWithRequest = useCallback(
    (request: { url: string }): boolean => {
      const { url } = request;

      try {
        const urlObj = new URL(request.url);
        const webAppHost = new URL(webAppUrl).hostname;
        const allowedHosts = [webAppHost, ...AUTH_PROVIDER_HOSTS];

        if (allowedHosts.includes(urlObj.hostname)) {
          return true;
        }
      } catch {
        // URL 파싱 실패 시 경고 로그 출력
        console.warn('Invalid URL:', url);
      }

      // 외부 링크는 기본 브라우저에서 열기
      Linking.openURL(url);
      return false;
    },
    [webAppUrl]
  );

  /**
   * @description WebView 로드 중 에러가 발생했을 때 호출되는 핸들러로,
   * 에러 발생 시 로딩을 멈추고 에러 페이지로 이동시킵니다.
   */
  const handleWebViewError = useCallback(
    (syntheticEvent: any) => {
      const { nativeEvent } = syntheticEvent;
      console.warn('WebView load error:', nativeEvent);

      if (webViewRef.current) {
        webViewRef.current.stopLoading?.();

        const errorUrl = `${webAppUrl}/error`;

        webViewRef.current.injectJavaScript(`
          window.location.href = "${errorUrl}";
          true;
        `);
      }
    },
    [webViewRef, webAppUrl]
  );

  return {
    handleShouldStartLoadWithRequest,
    handleWebViewError,
  };
};

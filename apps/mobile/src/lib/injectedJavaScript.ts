/**
 * @description 웹페이지의 배경색이 변경될 때마다 postMessage를 통해 React Native 앱으로 색상 값을 전송합니다.
 * 이를 통해 네이티브 컨테이너의 배경색을 웹페이지와 동기화하여 UI의 이질감을 없앨 수 있습니다.
 *
 * @author 박희진
 */

export const injectedJavaScript = `
    (function() {
      // ReactNativeWebView 존재 확인
      if (!window.ReactNativeWebView) {
        console.warn('ReactNativeWebView is not available');
        return;
      }

      let lastColor = '';
      let colorCheckTimeout = null;

      function sendBackgroundColor() {
        try {
          const bgColor = window.getComputedStyle(document.body).backgroundColor;
          // 색상이 실제로 변경되었을 때만 메시지 전송 (불필요한 업데이트 방지)
          if (bgColor !== lastColor) {
            lastColor = bgColor;
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'backgroundColor',
              color: bgColor
            }));
          }
        } catch (error) {
          console.error('Error sending background color:', error);
        }
      }

      function debouncedSendBackgroundColor() {
        if (colorCheckTimeout) {
          clearTimeout(colorCheckTimeout);
        }
        colorCheckTimeout = setTimeout(sendBackgroundColor, 100);
      }

      // 초기 로드 시 배경색 전송
      if (document.readyState === 'complete') {
        sendBackgroundColor();
      } else {
        window.addEventListener('load', sendBackgroundColor);
      }

      // URL 변경 감지
      let lastUrl = location.href;
      const observer = new MutationObserver(() => {
        if (location.href !== lastUrl) {
          lastUrl = location.href;
          debouncedSendBackgroundColor();
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });

      // 스타일 변경 감지
      const styleObserver = new MutationObserver(() => {
        debouncedSendBackgroundColor();
      });
      styleObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['style', 'class']
      });
    })();
    true;
  `;

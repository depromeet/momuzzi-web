import { useRef, useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { WebView, WebViewMessageEvent } from 'react-native-webview';

import { useWebViewHandlers } from './hooks/useWebViewHandlers';
import { injectedJavaScript } from './lib/injectedJavaScript';

type WebViewMessage = {
  type: 'backgroundColor';
  color: string;
};

const WEB_APP_URL = process.env.EXPO_PUBLIC_WEB_URL;

if (!WEB_APP_URL) {
  throw new Error('EXPO_PUBLIC_WEB_URL 환경 변수가 설정되지 않았습니다.');
}

const App = () => {
  const webViewRef = useRef<WebView>(null);
  const [backgroundColor, setBackgroundColor] = useState('transparent');

  const { handleShouldStartLoadWithRequest, handleWebViewError } = useWebViewHandlers({
    webViewRef,
    webAppUrl: WEB_APP_URL,
  });

  const handleMessage = (event: WebViewMessageEvent) => {
    try {
      const data = JSON.parse(event.nativeEvent.data) as WebViewMessage;

      if (data.type === 'backgroundColor') {
        setBackgroundColor(data.color);
      }
    } catch (error) {
      console.warn('배경색 변경 실패:', error);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[styles.container, { backgroundColor }]}
        edges={['top', 'left', 'right']}
      >
        <WebView
          ref={webViewRef}
          source={{ uri: WEB_APP_URL }}
          style={styles.webview}
          onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
          onError={handleWebViewError}
          onHttpError={handleWebViewError}
          onMessage={handleMessage}
          injectedJavaScript={injectedJavaScript}
          javaScriptEnabled
          domStorageEnabled
          startInLoadingState
          scalesPageToFit
          keyboardDisplayRequiresUserAction={false}
          mixedContentMode="compatibility"
          thirdPartyCookiesEnabled
          sharedCookiesEnabled
          incognito={false}
          cacheEnabled
        />
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default App;

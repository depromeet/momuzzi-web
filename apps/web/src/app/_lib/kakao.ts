export const initKakaoSDK = () => {
  if (typeof window === 'undefined') return;

  const appKey = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;
  if (!appKey) {
    console.error('카카오 앱 키가 설정되지 않았습니다.');
    return;
  }
  const script = document.createElement('script');
  script.src = 'https://developers.kakao.com/sdk/js/kakao.min.js';
  script.async = true;

  script.onload = () => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(appKey);
    }
  };

  document.head.appendChild(script);
};

export const shareKakaoLink = (shareUrl?: string) => {
  if (typeof window === 'undefined' || !window.Kakao) {
    console.error('카카오 SDK가 로드되지 않았습니다.');
    return;
  }

  const url = shareUrl || window.location.href;

  window.Kakao.Link.sendDefault({
    objectType: 'feed',
    content: {
      title: '식당 추천을 위한 설문이 시작됐어요!',
      description: '모무찌에서 먹고 싶은 메뉴를 어필해보세요.',
      imageUrl: `${window.location.origin}/images/momuzzi-kakao.png`,
      imageWidth: 1200,
      imageHeight: 604,
      link: {
        mobileWebUrl: url,
        webUrl: url,
      },
    },
    buttons: [
      {
        title: '설문 하러 가기',
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
    ],
  });
};

declare global {
  interface Window {
    Kakao: {
      isInitialized: () => boolean;
      init: (appKey: string) => void;
      Link: {
        sendDefault: (config: {
          objectType: string;
          content: {
            title: string;
            description: string;
            imageUrl: string;
            imageWidth?: number;
            imageHeight?: number;
            link: {
              mobileWebUrl: string;
              webUrl: string;
            };
          };
          buttons: Array<{
            title: string;
            link: {
              mobileWebUrl: string;
              webUrl: string;
            };
          }>;
        }) => void;
      };
    };
  }
}

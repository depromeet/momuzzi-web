import { MantineProvider } from '@mantine/core';
import Image from 'next/image';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import ScaledStage from '@/app/_components/layout/ScaledStage';
import { ToastProvider } from '@/app/_features/toast';
import ReactQueryProvider from '@/app/_providers/ReactQueryProvider';

import type { Viewport, Metadata } from 'next';

import '@mantine/core/styles.layer.css';
import '@mantine/dates/styles.css';
import './globals.css';

const APP_NAME = '모무찌';
const APP_TITLE = '모두의 취향을 모아 식당 추천 - 모무찌';
const APP_DESCRIPTION = '오늘의 메뉴 고민, 모무찌가 대신 해드릴게요!';
const APP_URL = 'https://www.momuzzi.site';
const OG_IMAGE_URL = `${APP_URL}/og-image.png`;

export const metadata: Metadata = {
  title: APP_TITLE,
  description: APP_DESCRIPTION,
  keywords: ['식당', '추천', '설문', '맛집', '음식'],
  authors: [{ name: 'depromeet-momuzzi' }],

  icons: {
    icon: '/favicon.png',
    apple: '/favicon-180x180.png',
  },

  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: APP_URL,
    siteName: APP_NAME,
    title: APP_TITLE,
    description: APP_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 604,
        alt: APP_NAME,
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: APP_TITLE,
    description: APP_DESCRIPTION,
    images: [OG_IMAGE_URL],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko" suppressHydrationWarning>
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="모무찌" />
      <meta name="theme-color" content="#e03900" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon-180x180.png" />
      <link rel="manifest" href="/manifest.json" />
      <body className="antialiased">
        <ScaledStage
          mode="production"
          allowScroll
          showFrame
          frameClassName="ring-2 ring-purple-500"
          showLabel
          baseWidth={375}
          baseHeight={668}
          maxScalePx={1000} // 높이 완전 매칭
          minScalePx={0.5}
          backdrop={
            <Image
              src="/images/backgroundImage.png"
              alt=""
              aria-hidden
              role="presentation"
              fill
              sizes="100vw"
              className="object-cover"
            />
          }
        >
          <MantineProvider>
            <ReactQueryProvider>
              <NuqsAdapter>{children}</NuqsAdapter>
            </ReactQueryProvider>
          </MantineProvider>
        </ScaledStage>
        <ToastProvider />
      </body>
    </html>
  );
};

export default RootLayout;

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../styles/global.css';
import Header from '@/components/common/Header';
import { Providers } from './providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'SwimX | 수영 기록 관리의 시작',
  metadataBase: new URL('https://swim-x.vercel.app'),
  description:
    '쉽고 간편한 수영 기록 서비스, SwimX에서 나만의 수영 일기를 아카이빙해보세요!',
  icons: {
    icon: '/meta/favicon.png',
  },
  openGraph: {
    title: 'SwimX | 수영 기록 관리의 시작',
    description:
      '쉽고 간편한 수영 기록 서비스, SwimX에서 수영 일기와 통계를 한번에!',
    url: 'https://swim-x.vercel.app',
    siteName: 'SwimX',
    images: [
      {
        url: '/meta/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SwimX Open Graph Image',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}

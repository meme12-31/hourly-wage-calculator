import type { Metadata } from 'next';
import './globals.css';
import { BASE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: BASE_URL,
    siteName: 'HITtools',
    images: [
      {
        url: `${BASE_URL}/ogp.png`,
        width: 1200,
        height: 630,
        alt: '時給計算・シフト＆目標逆算ツール',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [`${BASE_URL}/ogp.png`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased">
        {children}
      </body>
    </html>
  );
}

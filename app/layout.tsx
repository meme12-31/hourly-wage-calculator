import type { Metadata } from 'next';
import './globals.css';
import { BASE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  robots: {
    index: true,
    follow: true,
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

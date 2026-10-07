import React from 'react';
import type { Metadata } from 'next';
import { BASE_URL } from '@/lib/constants';
import { CalculatorApp } from '@/components/calculator-app';
import { SeoContentSection, FAQ_ITEMS } from '@/components/seo-content-section';
import { ColumnCard } from '@/components/column-card';
import { Footer } from '@/components/footer';
import { BLOG_POSTS_META } from '@/data/hourly-wage-columns';
import { BookOpen, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '時給計算・シフト＆目標逆算ツール | バイト・パートの給与・シフト計算を効率化',
  description:
    '時給とシフトから見込み月収を自動計算。目標月収に必要な勤務時間や出勤日数の逆算、103万・106万・130万の年収の壁シミュレーションに対応。無料・登録不要でカレンダー連動の給与計算が即座にできます。',
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: '時給計算・シフト＆目標逆算ツール | バイト・パートの給与・シフト計算を効率化',
    description:
      '時給とシフトから見込み月収を自動計算。目標月収に必要な勤務時間や出勤日数の逆算、103万・106万・130万の年収の壁シミュレーションに対応。無料・登録不要でカレンダー連動の給与計算が即座にできます。',
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
    locale: 'ja_JP',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HomePage() {
  // ピックアップコラム（先頭3本）
  const pickupPosts = BLOG_POSTS_META.slice(0, 3);

  // 構造化データ: WebApplication
  const webAppJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: '時給計算・シフト＆目標逆算ツール',
    url: BASE_URL,
    description:
      '時給とシフトから見込み月収を自動計算。目標月収に必要な勤務時間や出勤日数の逆算、103万・106万・130万の年収の壁シミュレーションに対応した無料Webツール。',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'JPY',
    },
  };

  // 構造化データ: FAQPage
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      {/* 構造化データ（JSON-LD） */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* メインツール本体（クライアントコンポーネント） */}
      <CalculatorApp />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 関連コラムセクション */}
        <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center space-x-2 mb-6 pb-3 border-b border-slate-100">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-800">
              時給・シフト・扶養に関するお役立ちコラム
            </h2>
          </div>

          <div className="space-y-4">
            {pickupPosts.map((post) => (
              <ColumnCard key={post.slug} post={post} />
            ))}
          </div>

          <div className="mt-6">
            <Link
              href="/column"
              className="w-full inline-flex items-center justify-center space-x-2 py-3.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition"
            >
              <span>お役立ちコラム一覧を見る</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* サーバーサイドレンダリングされるSEO解説・FAQセクション */}
        <SeoContentSection />
      </div>

      {/* フッター */}
      <Footer />
    </>
  );
}

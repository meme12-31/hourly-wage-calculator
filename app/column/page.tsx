import React from 'react';
import type { Metadata } from 'next';
import { BASE_URL } from '@/lib/constants';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ColumnCard } from '@/components/column-card';
import { ToolBanner } from '@/components/tool-banner';
import { BLOG_POSTS_META } from '@/data/hourly-wage-columns';
import { BookOpen, ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '時給計算コラム一覧 | HITtools',
  description:
    '時給から月収の計算式や目標月収の逆算方法、103万・130万などの年収の壁、深夜・残業手当の仕組みを詳しく解説したコラム一覧です。無料・登録不要の時給計算ツールと連動し損をしない働き方をサポートします。',
  alternates: {
    canonical: `${BASE_URL}/column`,
  },
  openGraph: {
    title: '時給計算コラム一覧 | HITtools',
    description:
      '時給から月収の計算式や目標月収の逆算方法、103万・130万などの年収の壁、深夜・残業手当の仕組みを詳しく解説したコラム一覧です。無料・登録不要の時給計算ツールと連動し損をしない働き方をサポートします。',
    url: `${BASE_URL}/column`,
    siteName: 'HITtools',
    locale: 'ja_JP',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ColumnListPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '時給計算ツール',
        item: BASE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'コラム一覧',
        item: `${BASE_URL}/column`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 flex-1">
        {/* パンくずリスト */}
        <nav className="flex items-center space-x-2 text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-emerald-600 flex items-center space-x-1">
            <Home className="w-3.5 h-3.5" />
            <span>ツールトップ</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-700 font-bold">コラム一覧</span>
        </nav>

        {/* ページタイトル */}
        <div className="mb-8">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>給与・扶養・時給ノウハウ</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            時給・給与計算お役立ちコラム一覧
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl">
            アルバイトやパートで賢く稼ぐための給与計算ノウハウ、扶養内の年収制限、割増手当の仕組みをわかりやすく解説しています。
          </p>
        </div>

        {/* コラム一覧グリッド (全10本) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_POSTS_META.map((post) => (
            <ColumnCard key={post.slug} post={post} />
          ))}
        </div>

        {/* ツールへの誘導バナー */}
        <ToolBanner />
      </main>

      <Footer />
    </>
  );
}

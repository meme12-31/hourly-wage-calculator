import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BASE_URL } from '@/lib/constants';
import { BLOG_POSTS_META } from '@/data/hourly-wage-columns';
import { getPostBySlug } from '@/lib/markdown';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ToolBanner } from '@/components/tool-banner';
import { ColumnCard } from '@/components/column-card';
import { Calendar, Clock, ChevronRight, Home, BookOpen, Share2 } from 'lucide-react';
import Link from 'next/link';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return BLOG_POSTS_META.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = BLOG_POSTS_META.find((p) => p.slug === params.slug);
  if (!post) {
    return {
      title: '記事が見つかりません | HITtools',
    };
  }

  // 32文字以内に収まるようタイトルのフォーマットを調整
  let title = `${post.title} | HITtools`;
  if (title.length > 32) {
    title = `${post.title.substring(0, 21)}... | HITtools`;
  }

  const url = `${BASE_URL}/column/${post.slug}`;

  return {
    title,
    description: post.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description: post.description,
      url,
      siteName: 'HITtools',
      locale: 'ja_JP',
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ColumnDetailPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    notFound();
  }

  // 関連記事（自分以外から3件）
  const relatedPosts = BLOG_POSTS_META.filter((p) => p.slug !== post.slug).slice(0, 3);

  const articleUrl = `${BASE_URL}/column/${post.slug}`;

  // 構造化データ: Article
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    author: {
      '@type': 'Organization',
      name: 'HITtools 編集部',
      url: 'https://hit-tool.com/',
    },
    publisher: {
      '@type': 'Organization',
      name: 'HITtools',
      url: 'https://hit-tool.com/',
    },
  };

  // 構造化データ: BreadcrumbList
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
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: articleUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 flex-1">
        {/* パンくずリスト */}
        <nav className="flex items-center space-x-2 text-xs text-slate-500 mb-6 flex-wrap gap-y-1" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-emerald-600 flex items-center space-x-1">
            <Home className="w-3.5 h-3.5" />
            <span>ツールトップ</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/column" className="hover:text-emerald-600">
            コラム一覧
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-700 font-bold truncate max-w-[200px] sm:max-w-xs">
            {post.title}
          </span>
        </nav>

        {/* 記事ヘッダー */}
        <article className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm">
          <header className="pb-6 mb-6 border-b border-slate-100">
            {post.category && (
              <span className="inline-block text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md mb-3">
                {post.category}
              </span>
            )}
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 leading-tight mb-4">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>公開: {post.publishedAt}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>更新: {post.updatedAt}</span>
              </span>
              {post.readTime && (
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>読了目安: {post.readTime}</span>
                </span>
              )}
            </div>
          </header>

          {/* 記事冒頭のツールバナー */}
          <ToolBanner
            title="時給・シフトから今月の見込み月収を計算"
            description="目標金額までの不足時間や出勤日数を今すぐシミュレーションできます。"
          />

          {/* 記事本文（SSR HTML） */}
          <div
            className="prose-content my-8"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          {/* 記事末尾のツールバナー */}
          <ToolBanner
            title="あなたの時給で月収と目標日数を計算してみましょう"
            description="カレンダー連動で当月のシフトを調整するだけで、リアルタイムに見込み給与が分かります。"
          />
        </article>

        {/* 関連記事セクション */}
        <section className="mt-12">
          <div className="flex items-center space-x-2 mb-4">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-bold text-slate-800">
              おすすめの関連コラム
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedPosts.map((related) => (
              <ColumnCard key={related.slug} post={related} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

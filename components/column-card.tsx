import React from 'react';
import Link from 'next/link';
import { BlogPostMeta } from '@/lib/types';
import { Clock, Calendar, ArrowRight, BookOpen } from 'lucide-react';

interface ColumnCardProps {
  post: BlogPostMeta;
}

export const ColumnCard: React.FC<ColumnCardProps> = ({ post }) => {
  return (
    <Link
      href={`/column/${post.slug}`}
      className="group block bg-white rounded-xl border border-slate-200 hover:border-emerald-500 shadow-xs hover:shadow-md transition-all p-5 flex flex-col justify-between"
    >
      <div>
        {/* カテゴリ & 読了目安 */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
          {post.category && (
            <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              {post.category}
            </span>
          )}
          {post.readTime && (
            <span className="flex items-center space-x-1 text-slate-400">
              <Clock className="w-3 h-3" />
              <span>{post.readTime}</span>
            </span>
          )}
        </div>

        {/* タイトル */}
        <h3 className="font-bold text-slate-900 group-hover:text-emerald-600 transition text-sm sm:text-base mb-2 line-clamp-2">
          {post.title}
        </h3>

        {/* 概要 */}
        <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed">
          {post.description}
        </p>
      </div>

      {/* フッター（日付 & リンク誘導） */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-400">
        <span className="flex items-center space-x-1">
          <Calendar className="w-3 h-3" />
          <span>{post.publishedAt}</span>
        </span>
        <span className="text-emerald-600 font-bold flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
          <span>記事を読む</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
};

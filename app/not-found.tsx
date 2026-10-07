import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Calculator, ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-20 text-center flex-1">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-sm">
          <div className="w-16 h-16 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-2xl">
            404
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">
            ページが見つかりませんでした
          </h1>
          <p className="text-sm text-slate-500 mb-8">
            お探しのページは移動または削除された可能性があります。
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition shadow-sm"
            >
              <Calculator className="w-4 h-4" />
              <span>時給計算ツールへ戻る</span>
            </Link>
            <Link
              href="/column"
              className="inline-flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm px-5 py-2.5 rounded-xl transition"
            >
              <span>コラム一覧を見る</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

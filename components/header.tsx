'use client';

import React from 'react';
import Link from 'next/link';
import { Calculator, BookOpen, RotateCcw } from 'lucide-react';
import { MAIN_SITE_URL } from '@/lib/constants';

interface HeaderProps {
  onReset?: () => void;
  showReset?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onReset, showReset = false }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 左側: HITtoolsブランド & ツールタイトル */}
          <div className="flex items-center space-x-3">
            <a
              href={MAIN_SITE_URL}
              className="text-xs font-bold bg-slate-900 text-white px-2.5 py-1 rounded hover:bg-slate-800 transition"
              title="HITtools メインサイトトップへ"
            >
              HITtools
            </a>
            <span className="text-slate-300">/</span>
            <Link
              href="/"
              className="flex items-center space-x-2 text-slate-900 font-bold text-sm sm:text-base hover:text-emerald-600 transition"
            >
              <Calculator className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>時給計算・目標逆算</span>
            </Link>
          </div>

          {/* 右側: ナビゲーション & リセットボタン */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link
              href="/column"
              className="flex items-center space-x-1 text-xs sm:text-sm font-medium text-slate-600 hover:text-emerald-600 px-2.5 py-1.5 rounded-md hover:bg-slate-50 transition"
            >
              <BookOpen className="w-4 h-4" />
              <span>コラム一覧</span>
            </Link>

            {showReset && onReset && (
              <button
                type="button"
                onClick={onReset}
                className="flex items-center space-x-1 text-xs sm:text-sm font-medium text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-2.5 py-1.5 rounded-md transition"
                title="入力値を初期状態にリセット"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">リセット</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

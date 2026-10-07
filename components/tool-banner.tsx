import React from 'react';
import Link from 'next/link';
import { Calculator, ArrowRight, Sparkles } from 'lucide-react';

interface ToolBannerProps {
  title?: string;
  description?: string;
}

export const ToolBanner: React.FC<ToolBannerProps> = ({
  title = 'シフト・目標から今月の給与を即座にシミュレーション',
  description = 'カレンダー連動で出勤日ごとの微調整も自由自在。目標月収に必要な日数や年収の壁も一目で分かります。',
}) => {
  return (
    <div className="my-8 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 rounded-2xl p-6 sm:p-7 text-white shadow-md relative overflow-hidden not-prose">
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-1.5 bg-white/20 text-emerald-100 text-xs px-2.5 py-0.5 rounded-full font-semibold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>完全無料・登録不要</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white pt-1">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed max-w-xl">
            {description}
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center space-x-2 bg-white text-emerald-700 hover:bg-emerald-50 px-5 py-3 rounded-xl font-bold text-sm shadow-sm transition whitespace-nowrap self-start sm:self-auto hover:scale-105 transform duration-150"
        >
          <Calculator className="w-4 h-4 text-emerald-600" />
          <span>時給計算ツールを使う</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

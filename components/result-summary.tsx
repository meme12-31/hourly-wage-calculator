'use client';

import React, { useState } from 'react';
import { SalaryCalculationResult, UserShiftSettings } from '@/lib/types';
import { formatCurrency } from '@/lib/calc';
import {
  Coins,
  Clock,
  CalendarDays,
  TrendingUp,
  Bus,
  Copy,
  Check,
  Printer,
  Sparkles,
} from 'lucide-react';

interface ResultSummaryProps {
  settings: UserShiftSettings;
  result: SalaryCalculationResult;
}

export const ResultSummary: React.FC<ResultSummaryProps> = ({
  settings,
  result,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyText = async () => {
    const text = [
      `【時給計算シミュレーション結果（${result.targetYearMonth}）】`,
      `・見込み月収: ${formatCurrency(result.projectedMonthlyIncome)}円`,
      `・総労働時間: ${result.totalWorkHours}時間（出勤日数: ${result.workDaysCount}日）`,
      `・実質時給: ${formatCurrency(result.effectiveHourlyWage)}円（基本時給: ${formatCurrency(settings.wage)}円）`,
      `・基本給計: ${formatCurrency(result.totalBaseSalary)}円 / 交通費計: ${formatCurrency(result.totalTransportExpense)}円`,
      `・年収換算（概算）: ${formatCurrency(result.annualProjectedIncome)}円`,
      `※HITtools 時給計算ツールで作成: https://hit-tool.com/hourly-wage-calculator`,
    ].join('\n');

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard', err);
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-2xl p-6 sm:p-7 shadow-lg relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />

      {/* ヘッダー部 */}
      <div className="flex items-center justify-between pb-4 border-b border-emerald-500/50 mb-5">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-emerald-200" />
          <h2 className="text-base sm:text-lg font-bold tracking-wide">
            {result.targetYearMonth} の給与試算
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleCopyText}
            className="flex items-center space-x-1 text-xs font-semibold bg-emerald-800/80 hover:bg-emerald-800 px-2.5 py-1.5 rounded-lg transition"
            title="結果をクリップボードにコピー"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span className="text-emerald-200">コピー完了</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-emerald-200" />
                <span>コピー</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="hidden sm:flex items-center space-x-1 text-xs font-semibold bg-emerald-800/80 hover:bg-emerald-800 px-2.5 py-1.5 rounded-lg transition"
            title="結果を印刷"
          >
            <Printer className="w-3.5 h-3.5 text-emerald-200" />
            <span>印刷</span>
          </button>
        </div>
      </div>

      {/* メイン: 見込み月収 */}
      <div className="mb-6">
        <div className="text-xs sm:text-sm font-medium text-emerald-100 mb-1">
          当月見込み月収（手当込）
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            ¥{formatCurrency(result.projectedMonthlyIncome)}
          </span>
          <span className="text-xs sm:text-sm text-emerald-100 font-medium">（税込・額面）</span>
        </div>
      </div>

      {/* サブ指標グリッド */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        {/* 実質時給 */}
        <div className="bg-emerald-800/50 backdrop-blur-xs rounded-xl p-3 border border-emerald-500/30">
          <div className="flex items-center space-x-1 text-xs text-emerald-200 mb-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>実質時給</span>
          </div>
          <div className="text-base sm:text-lg font-bold text-white">
            ¥{formatCurrency(result.effectiveHourlyWage)}
          </div>
          <div className="text-[10px] text-emerald-200 truncate">
            基本 {formatCurrency(settings.wage)}円
          </div>
        </div>

        {/* 総労働時間 */}
        <div className="bg-emerald-800/50 backdrop-blur-xs rounded-xl p-3 border border-emerald-500/30">
          <div className="flex items-center space-x-1 text-xs text-emerald-200 mb-1">
            <Clock className="w-3.5 h-3.5" />
            <span>総労働時間</span>
          </div>
          <div className="text-base sm:text-lg font-bold text-white">
            {result.totalWorkHours} <span className="text-xs font-normal">時間</span>
          </div>
          <div className="text-[10px] text-emerald-200 truncate">
            実日数 {result.daysInMonth}日中
          </div>
        </div>

        {/* 出勤日数 */}
        <div className="bg-emerald-800/50 backdrop-blur-xs rounded-xl p-3 border border-emerald-500/30">
          <div className="flex items-center space-x-1 text-xs text-emerald-200 mb-1">
            <CalendarDays className="w-3.5 h-3.5" />
            <span>出勤日数</span>
          </div>
          <div className="text-base sm:text-lg font-bold text-white">
            {result.workDaysCount} <span className="text-xs font-normal">日</span>
          </div>
          <div className="text-[10px] text-emerald-200 truncate">
            休日 {result.daysInMonth - result.workDaysCount}日
          </div>
        </div>

        {/* 交通費支給額 */}
        <div className="bg-emerald-800/50 backdrop-blur-xs rounded-xl p-3 border border-emerald-500/30">
          <div className="flex items-center space-x-1 text-xs text-emerald-200 mb-1">
            <Bus className="w-3.5 h-3.5" />
            <span>交通費手当</span>
          </div>
          <div className="text-base sm:text-lg font-bold text-white">
            ¥{formatCurrency(result.totalTransportExpense)}
          </div>
          <div className="text-[10px] text-emerald-200 truncate">
            基本給 ¥{formatCurrency(result.totalBaseSalary)}
          </div>
        </div>
      </div>
    </div>
  );
};

'use client';

import React from 'react';
import { TargetCalculationResult, SalaryCalculationResult } from '@/lib/types';
import { formatCurrency } from '@/lib/calc';
import { Target, CheckCircle2, AlertTriangle, ArrowRight, Hourglass } from 'lucide-react';

interface TargetCalculatorProps {
  targetResult: TargetCalculationResult;
  salaryResult: SalaryCalculationResult;
}

export const TargetCalculator: React.FC<TargetCalculatorProps> = ({
  targetResult,
  salaryResult,
}) => {
  const isAchieved = targetResult.shortageAmount === 0 && targetResult.targetMonthlyIncome > 0;
  const hasTarget = targetResult.targetMonthlyIncome > 0;

  if (!hasTarget) {
    return (
      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200">
        <div className="flex items-center space-x-2 text-slate-700 font-bold mb-2">
          <Target className="w-5 h-5 text-emerald-600" />
          <h2 className="text-base font-bold text-slate-800">目標月収の逆算</h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-500">
          基本設定で「今月の目標月収」を入力すると、目標達成に必要な追加労働時間や出勤日数が自動計算されます。
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <Target className="w-5 h-5 text-emerald-600" />
          <h2 className="text-base font-bold text-slate-800">目標月収の逆算・進捗</h2>
        </div>
        <div className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
          目標: ¥{formatCurrency(targetResult.targetMonthlyIncome)}
        </div>
      </div>

      {/* プログレスバー */}
      <div className="mb-5">
        <div className="flex justify-between text-xs font-bold mb-1.5">
          <span className="text-slate-600">達成率</span>
          <span className={isAchieved ? 'text-emerald-600' : 'text-slate-800'}>
            {targetResult.achievementRate}%
          </span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              isAchieved
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                : 'bg-emerald-500'
            }`}
            style={{ width: `${Math.min(100, targetResult.achievementRate)}%` }}
          />
        </div>
      </div>

      {/* 判定・逆算結果 */}
      {isAchieved ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start space-x-3 text-emerald-900">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-sm">目標月収を達成見込みです！</div>
            <p className="text-xs text-emerald-700 mt-0.5">
              現在のシフトで目標額（¥{formatCurrency(targetResult.targetMonthlyIncome)}）を上回る見込みです。無理のないペースを維持しましょう。
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {/* 不足金額 */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-semibold">目標まであと</span>
            </div>
            <span className="text-base sm:text-lg font-extrabold text-amber-900">
              ¥{formatCurrency(targetResult.shortageAmount)}
            </span>
          </div>

          {/* 逆算アドバイス */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[11px] text-slate-500 font-medium mb-1">
                必要な追加労働時間
              </div>
              <div className="text-lg sm:text-xl font-bold text-slate-800">
                約 {targetResult.neededAdditionalHours}{' '}
                <span className="text-xs font-normal">時間</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                時給単価で換算
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[11px] text-slate-500 font-medium mb-1">
                必要な追加出勤日数
              </div>
              <div className="text-lg sm:text-xl font-bold text-slate-800">
                約 {targetResult.neededAdditionalDays}{' '}
                <span className="text-xs font-normal">日</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                平均 {targetResult.averageDailyHours}h/日換算
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

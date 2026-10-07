'use client';

import React, { useState } from 'react';
import { IncomeWallResult } from '@/lib/types';
import { formatCurrency } from '@/lib/calc';
import { Shield, ChevronDown, ChevronUp, AlertCircle, CheckCircle } from 'lucide-react';

interface IncomeWallCardProps {
  incomeWallResult: IncomeWallResult;
}

export const IncomeWallCard: React.FC<IncomeWallCardProps> = ({
  incomeWallResult,
}) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-emerald-600" />
          <h2 className="text-base font-bold text-slate-800">年収の壁シミュレーション</h2>
        </div>
        <div className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
          年収換算: ¥{formatCurrency(incomeWallResult.annualProjectedIncome)}
        </div>
      </div>

      <p className="text-xs text-slate-500 mb-4">
        当月の見込み月収をベースに12ヶ月継続した場合の年間想定年収と、各種扶養枠・社会保険の壁までの残額です。
      </p>

      {/* 各壁のリスト */}
      <div className="space-y-3">
        {incomeWallResult.walls.map((wall, idx) => {
          const isExpanded = expandedIndex === idx;

          return (
            <div
              key={wall.limit}
              className={`rounded-xl border transition p-3.5 ${
                wall.isExceeded
                  ? 'bg-rose-50/60 border-rose-200'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* メイン行 */}
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleExpand(idx)}
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm text-slate-800">
                      {wall.name}
                    </span>
                    {wall.isExceeded ? (
                      <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded">
                        超過
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                        枠内
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {wall.description}
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-right">
                  <div>
                    <div className="text-xs text-slate-400 font-medium">
                      {wall.isExceeded ? '超過額' : 'あと'}
                    </div>
                    <div
                      className={`text-sm sm:text-base font-bold ${
                        wall.isExceeded ? 'text-rose-600' : 'text-emerald-700'
                      }`}
                    >
                      ¥{formatCurrency(wall.remaining)}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="text-slate-400 hover:text-slate-600 p-1"
                    aria-label="詳細の開閉"
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* プログレスバー */}
              <div className="mt-2.5">
                <div className="w-full bg-slate-200/80 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      wall.isExceeded ? 'bg-rose-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.min(100, wall.progressRate)}%` }}
                  />
                </div>
              </div>

              {/* 展開時詳細解説 */}
              {isExpanded && (
                <div className="mt-3 pt-3 border-t border-slate-200/60 text-xs text-slate-600 space-y-1">
                  <p className="leading-relaxed">{wall.details}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

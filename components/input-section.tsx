'use client';

import React from 'react';
import { UserShiftSettings, TransportType } from '@/lib/types';
import { JapaneseYen, Target, Bus, Calendar as CalendarIcon } from 'lucide-react';

interface InputSectionProps {
  settings: UserShiftSettings;
  onChange: (newSettings: Partial<UserShiftSettings>) => void;
}

const QUICK_WAGES = [1050, 1100, 1200, 1300, 1500];
const QUICK_TARGETS = [50000, 80000, 100000, 120000, 150000];

export const InputSection: React.FC<InputSectionProps> = ({ settings, onChange }) => {
  const handleWageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10);
    onChange({ wage: isNaN(val) ? 0 : Math.min(100000, Math.max(0, val)) });
  };

  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10);
    onChange({ targetMonthlyIncome: isNaN(val) ? 0 : Math.min(2000000, Math.max(0, val)) });
  };

  const handleTransportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10);
    onChange({ transportExpense: isNaN(val) ? 0 : Math.min(100000, Math.max(0, val)) });
  };

  const handleTransportTypeChange = (type: TransportType) => {
    onChange({ transportType: type });
  };

  const handleYearMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      onChange({ targetYearMonth: e.target.value });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 sm:p-6 mb-6">
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
        <h2 className="text-base sm:text-lg font-bold text-slate-800 flex items-center space-x-2">
          <JapaneseYen className="w-5 h-5 text-emerald-600" />
          <span>基本給与・目標条件</span>
        </h2>
        {/* 対象年月セレクター */}
        <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1">
          <CalendarIcon className="w-4 h-4 text-slate-500" />
          <input
            type="month"
            value={settings.targetYearMonth}
            onChange={handleYearMonthChange}
            className="text-xs sm:text-sm font-semibold text-slate-700 bg-transparent focus:outline-none cursor-pointer"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* 基本時給 */}
        <div>
          <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
            基本時給 <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              value={settings.wage === 0 ? '' : settings.wage}
              onChange={handleWageChange}
              placeholder="1100"
              className="w-full pl-3 pr-10 py-2.5 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 font-bold text-slate-800 text-base transition"
            />
            <span className="absolute right-3 top-2.5 text-slate-400 font-medium text-sm">円</span>
          </div>
          {/* クイック選択 */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {QUICK_WAGES.map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => onChange({ wage: w })}
                className={`text-xs px-2 py-0.5 rounded border transition ${
                  settings.wage === w
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300 font-bold'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {w}円
              </button>
            ))}
          </div>
        </div>

        {/* 目標月収 */}
        <div>
          <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5 flex items-center justify-between">
            <span className="flex items-center space-x-1">
              <Target className="w-3.5 h-3.5 text-emerald-600" />
              <span>今月の目標月収</span>
            </span>
            <span className="text-xs text-slate-400 font-normal">任意</span>
          </label>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              value={settings.targetMonthlyIncome === 0 ? '' : settings.targetMonthlyIncome}
              onChange={handleTargetChange}
              placeholder="100000"
              className="w-full pl-3 pr-10 py-2.5 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 font-bold text-slate-800 text-base transition"
            />
            <span className="absolute right-3 top-2.5 text-slate-400 font-medium text-sm">円</span>
          </div>
          {/* クイック選択 */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {QUICK_TARGETS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => onChange({ targetMonthlyIncome: t })}
                className={`text-xs px-2 py-0.5 rounded border transition ${
                  settings.targetMonthlyIncome === t
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300 font-bold'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {t / 10000}万円
              </button>
            ))}
          </div>
        </div>

        {/* 交通費設定 */}
        <div>
          <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5 flex items-center justify-between">
            <span className="flex items-center space-x-1">
              <Bus className="w-3.5 h-3.5 text-slate-500" />
              <span>交通費手当</span>
            </span>
            <div className="flex bg-slate-100 p-0.5 rounded text-xs">
              <button
                type="button"
                onClick={() => handleTransportTypeChange('daily')}
                className={`px-2 py-0.5 rounded transition ${
                  settings.transportType === 'daily'
                    ? 'bg-white font-bold text-emerald-700 shadow-xs'
                    : 'text-slate-500'
                }`}
              >
                日額
              </button>
              <button
                type="button"
                onClick={() => handleTransportTypeChange('monthly')}
                className={`px-2 py-0.5 rounded transition ${
                  settings.transportType === 'monthly'
                    ? 'bg-white font-bold text-emerald-700 shadow-xs'
                    : 'text-slate-500'
                }`}
              >
                月額
              </button>
            </div>
          </label>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              value={settings.transportExpense === 0 ? '' : settings.transportExpense}
              onChange={handleTransportChange}
              placeholder="0"
              className="w-full pl-3 pr-10 py-2.5 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 font-bold text-slate-800 text-base transition"
            />
            <span className="absolute right-3 top-2.5 text-slate-400 font-medium text-sm">円</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            {settings.transportType === 'daily'
              ? '出勤1日あたりの支給額（出勤日数に乗算）'
              : '1ヶ月あたりの固定定期代・支給額'}
          </p>
        </div>
      </div>
    </div>
  );
};

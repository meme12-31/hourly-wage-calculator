'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { UserShiftSettings } from '@/lib/types';
import { DEFAULT_SETTINGS } from '@/lib/constants';
import {
  calculateMonthlySalary,
  calculateTargetProgress,
  calculateIncomeWalls,
} from '@/lib/calc';
import {
  loadSettingsFromStorage,
  saveSettingsToStorage,
  clearSettingsFromStorage,
} from '@/lib/storage';
import { Header } from '@/components/header';
import { InputSection } from '@/components/input-section';
import { ShiftPatternInput } from '@/components/shift-pattern-input';
import { ShiftCalendar } from '@/components/shift-calendar';
import { ResultSummary } from '@/components/result-summary';
import { TargetCalculator } from '@/components/target-calculator';
import { IncomeWallCard } from '@/components/income-wall-card';
import { Clock, Calendar as CalendarIcon, SlidersHorizontal } from 'lucide-react';

export const CalculatorApp: React.FC = () => {
  const [settings, setSettings] = useState<UserShiftSettings>(DEFAULT_SETTINGS);
  const [activeTab, setActiveTab] = useState<'pattern' | 'calendar'>('pattern');
  const [isLoaded, setIsLoaded] = useState(false);

  // 初回マウント時に LocalStorage から読み込み
  useEffect(() => {
    const saved = loadSettingsFromStorage();
    setSettings(saved);
    setIsLoaded(true);
  }, []);

  // 設定変更時に Debounce して LocalStorage に保存
  useEffect(() => {
    if (!isLoaded) return;
    const timer = setTimeout(() => {
      saveSettingsToStorage(settings);
    }, 300);
    return () => clearTimeout(timer);
  }, [settings, isLoaded]);

  // 給与計算ロジック
  const salaryResult = useMemo(() => {
    return calculateMonthlySalary(settings);
  }, [settings]);

  // 目標逆算ロジック
  const targetResult = useMemo(() => {
    return calculateTargetProgress(settings, salaryResult);
  }, [settings, salaryResult]);

  // 年収の壁シミュレーション
  const incomeWallResult = useMemo(() => {
    return calculateIncomeWalls(salaryResult.annualProjectedIncome);
  }, [salaryResult.annualProjectedIncome]);

  // 設定更新ハンドラー
  const updateSettings = useCallback((partial: Partial<UserShiftSettings>) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  }, []);

  // リセットハンドラー
  const handleReset = useCallback(() => {
    if (window.confirm('すべての入力値とシフト設定を初期状態にリセットしますか？')) {
      clearSettingsFromStorage();
      setSettings(DEFAULT_SETTINGS);
    }
  }, []);

  return (
    <>
      <Header onReset={handleReset} showReset={true} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        {/* メインタイトルエリア */}
        <div className="mb-6">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>2026年最新 法令・カレンダー対応</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            時給計算・シフト＆目標逆算ツール
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-3xl">
            日別の勤務時間や出勤曜日から当月の見込み月収を実日数で自動計算。目標月収に必要な勤務時間や年収の壁（103万・106万・130万）も即座に逆算できます。
          </p>
        </div>

        {/* 2カラムレスポンシブレイアウト */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 左カラム: 入力フォームエリア (7/12) */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. 基本給与・目標入力 */}
            <InputSection settings={settings} onChange={updateSettings} />

            {/* 2. シフト入力エリア（タブ切替: 曜日パターン vs カレンダー微調整） */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <SlidersHorizontal className="w-5 h-5 text-emerald-600" />
                  <h2 className="text-base sm:text-lg font-bold text-slate-800">
                    シフト設定
                  </h2>
                </div>

                {/* タブボタン */}
                <div className="flex bg-slate-100 p-1 rounded-lg text-xs font-bold self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setActiveTab('pattern')}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md transition ${
                      activeTab === 'pattern'
                        ? 'bg-white text-emerald-700 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>曜日パターン</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('calendar')}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md transition ${
                      activeTab === 'calendar'
                        ? 'bg-white text-emerald-700 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <CalendarIcon className="w-3.5 h-3.5" />
                    <span>当月カレンダー微調整</span>
                  </button>
                </div>
              </div>

              {/* タブコンテンツ */}
              {activeTab === 'pattern' ? (
                <ShiftPatternInput
                  patterns={settings.weeklyPattern}
                  onChange={(newPatterns) => updateSettings({ weeklyPattern: newPatterns })}
                />
              ) : (
                <ShiftCalendar
                  targetYearMonth={settings.targetYearMonth}
                  daySummaries={salaryResult.daySummaries}
                  customDays={settings.customDays}
                  onCustomChange={(newCustom) => updateSettings({ customDays: newCustom })}
                />
              )}
            </div>
          </div>

          {/* 右カラム: 試算結果・目標逆算・年収の壁サマリー (5/12) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-20">
            {/* 1. 給与試算結果 */}
            <ResultSummary settings={settings} result={salaryResult} />

            {/* 2. 目標月収逆算カード */}
            <TargetCalculator targetResult={targetResult} salaryResult={salaryResult} />

            {/* 3. 年収の壁シミュレーションカード */}
            <IncomeWallCard incomeWallResult={incomeWallResult} />
          </div>
        </div>
      </main>
    </>
  );
};

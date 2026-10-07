'use client';

import React, { useState } from 'react';
import { CustomDayShift, DayShiftSummary } from '@/lib/types';
import { DAY_NAMES_JA } from '@/lib/constants';
import {
  Calendar as CalendarIcon,
  Clock,
  Coffee,
  X,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Plus,
} from 'lucide-react';
import { parseISO, getDay } from 'date-fns';

interface ShiftCalendarProps {
  targetYearMonth: string;
  daySummaries: DayShiftSummary[];
  customDays: Record<string, CustomDayShift>;
  onCustomChange: (newCustomDays: Record<string, CustomDayShift>) => void;
}

export const ShiftCalendar: React.FC<ShiftCalendarProps> = ({
  targetYearMonth,
  daySummaries,
  customDays,
  onCustomChange,
}) => {
  const [selectedDay, setSelectedDay] = useState<DayShiftSummary | null>(null);
  const [editHours, setEditHours] = useState<number>(0);
  const [editBreakMinutes, setEditBreakMinutes] = useState<number>(0);
  const [editIsOff, setEditIsOff] = useState<boolean>(false);

  // カレンダーの最初の日の曜日（空白セルの埋め用）
  const firstDayOfWeek = daySummaries.length > 0 ? daySummaries[0].dayOfWeek : 0;
  const blankDays = Array.from({ length: firstDayOfWeek });

  const openDayModal = (summary: DayShiftSummary) => {
    setSelectedDay(summary);
    setEditHours(summary.hours);
    setEditBreakMinutes(summary.breakMinutes);
    setEditIsOff(summary.isOff);
  };

  const closeModal = () => {
    setSelectedDay(null);
  };

  const handleSaveDay = () => {
    if (!selectedDay) return;
    const newCustom = { ...customDays };
    newCustom[selectedDay.dateStr] = {
      hours: Math.max(0, Math.min(24, editHours)),
      breakMinutes: Math.max(0, Math.min(1440, editBreakMinutes)),
      isOff: editIsOff,
    };
    onCustomChange(newCustom);
    closeModal();
  };

  const handleResetDay = () => {
    if (!selectedDay) return;
    const newCustom = { ...customDays };
    delete newCustom[selectedDay.dateStr];
    onCustomChange(newCustom);
    closeModal();
  };

  const handleClearAllCustom = () => {
    if (Object.keys(customDays).length === 0) return;
    if (window.confirm('当月のカレンダー個別調整をすべてリセットし、曜日パターンに戻しますか？')) {
      onCustomChange({});
    }
  };

  const customCount = Object.keys(customDays).length;

  return (
    <div className="space-y-4">
      {/* 上部説明 ＆ 一括リセット */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 text-xs text-slate-500">
        <span>日付をタップして、特定の日の勤務時間の変更や休み設定ができます。</span>
        {customCount > 0 && (
          <button
            type="button"
            onClick={handleClearAllCustom}
            className="flex items-center space-x-1 text-amber-600 hover:text-amber-700 font-medium self-start sm:self-auto bg-amber-50 px-2.5 py-1 rounded-md transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>個別調整（{customCount}日分）をリセット</span>
          </button>
        )}
      </div>

      {/* カレンダー本体 */}
      <div className="bg-slate-50 p-2 sm:p-4 rounded-xl border border-slate-200">
        {/* 曜日ヘッダー */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 text-center text-xs font-bold">
          {DAY_NAMES_JA.map((day, idx) => (
            <div
              key={day}
              className={`py-1.5 rounded ${
                idx === 0
                  ? 'text-rose-600 bg-rose-50'
                  : idx === 6
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-slate-600 bg-slate-100'
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* 日付グリッド */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {/* 先頭の空白セル */}
          {blankDays.map((_, i) => (
            <div key={`blank-${i}`} className="min-h-[64px] sm:min-h-[80px] bg-transparent" />
          ))}

          {/* 各日付セル */}
          {daySummaries.map((day) => {
            const isSunday = day.dayOfWeek === 0;
            const isSaturday = day.dayOfWeek === 6;

            return (
              <button
                key={day.dateStr}
                type="button"
                onClick={() => openDayModal(day)}
                className={`min-h-[64px] sm:min-h-[80px] p-1 sm:p-1.5 rounded-lg border text-left flex flex-col justify-between transition relative overflow-hidden group ${
                  day.isWorking
                    ? 'bg-white border-emerald-300 hover:border-emerald-500 shadow-xs'
                    : 'bg-white/70 border-slate-200 hover:border-slate-300 opacity-90'
                } ${day.isCustom ? 'ring-2 ring-amber-400 border-amber-400' : ''}`}
              >
                {/* 個別変更バッジ */}
                {day.isCustom && (
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-amber-500 rounded-bl-md" title="個別調整あり" />
                )}

                {/* 日付番号 & 曜日色 */}
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`text-xs sm:text-sm font-bold ${
                      isSunday
                        ? 'text-rose-600'
                        : isSaturday
                        ? 'text-blue-600'
                        : 'text-slate-700'
                    }`}
                  >
                    {day.dayOfMonth}
                  </span>
                  {day.isCustom && (
                    <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1 rounded sm:inline hidden">
                      調整済
                    </span>
                  )}
                </div>

                {/* 勤務情報 */}
                <div className="mt-1">
                  {day.isWorking ? (
                    <div>
                      <div className="text-[11px] sm:text-xs font-bold text-emerald-700">
                        {day.actualWorkHours}h
                      </div>
                      <div className="text-[9px] sm:text-[10px] text-slate-500 truncate hidden sm:block">
                        ¥{day.baseSalary.toLocaleString()}
                      </div>
                    </div>
                  ) : day.isOff && day.isCustom ? (
                    <span className="text-[10px] text-rose-500 font-bold">休み</span>
                  ) : (
                    <span className="text-[10px] text-slate-300">-</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 個別調整モーダル */}
      {selectedDay && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 sm:p-6 shadow-xl border border-slate-100 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-base text-slate-800">
                  {selectedDay.dateStr}（{DAY_NAMES_JA[selectedDay.dayOfWeek]}）のシフト調整
                </h3>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* 「この日は休みにする」チェック */}
              <label className="flex items-center space-x-2.5 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition">
                <input
                  type="checkbox"
                  checked={editIsOff}
                  onChange={(e) => setEditIsOff(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                />
                <span className="text-sm font-bold text-slate-700">この日を出勤しない（休みにする）</span>
              </label>

              {!editIsOff && (
                <>
                  {/* 拘束時間 */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>拘束時間（時間）</span>
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        step="0.5"
                        min="0"
                        max="24"
                        value={editHours}
                        onChange={(e) => setEditHours(parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 font-bold text-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                      />
                      <span className="text-sm font-medium text-slate-500">時間</span>
                    </div>
                  </div>

                  {/* 休憩時間 */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center space-x-1">
                      <Coffee className="w-3.5 h-3.5 text-slate-500" />
                      <span>休憩時間（分）</span>
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        step="15"
                        min="0"
                        max="360"
                        value={editBreakMinutes}
                        onChange={(e) => setEditBreakMinutes(parseInt(e.target.value, 10) || 0)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 font-bold text-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                      />
                      <span className="text-sm font-medium text-slate-500">分</span>
                    </div>
                  </div>

                  {/* 実質労働時間プレビュー */}
                  <div className="p-3 bg-emerald-50 rounded-lg text-xs text-emerald-800 flex justify-between items-center font-medium">
                    <span>実働労働時間:</span>
                    <span className="font-bold text-sm text-emerald-900">
                      {Math.max(0, editHours - editBreakMinutes / 60).toFixed(1)} 時間
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* アクションボタン */}
            <div className="mt-6 flex items-center justify-between gap-2">
              {selectedDay.isCustom ? (
                <button
                  type="button"
                  onClick={handleResetDay}
                  className="px-3 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                >
                  標準パターンに戻す
                </button>
              ) : (
                <div />
              )}
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-3 py-2 text-xs font-medium text-slate-500 hover:bg-slate-100 rounded-lg transition"
                >
                  キャンセル
                </button>
                <button
                  type="button"
                  onClick={handleSaveDay}
                  className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition"
                >
                  適用する
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

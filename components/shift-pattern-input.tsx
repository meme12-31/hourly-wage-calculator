'use client';

import React from 'react';
import { WeeklyShiftPattern } from '@/lib/types';
import { DAY_NAMES_JA } from '@/lib/constants';
import { Clock, Check } from 'lucide-react';

interface ShiftPatternInputProps {
  patterns: WeeklyShiftPattern[];
  onChange: (newPatterns: WeeklyShiftPattern[]) => void;
}

const PRESET_HOURS = [
  { label: '休み', hours: 0, breakMinutes: 0 },
  { label: '4h', hours: 4, breakMinutes: 0 },
  { label: '5h', hours: 5, breakMinutes: 0 },
  { label: '6h', hours: 6, breakMinutes: 45 },
  { label: '8h (休60m)', hours: 8, breakMinutes: 60 },
];

export const ShiftPatternInput: React.FC<ShiftPatternInputProps> = ({
  patterns,
  onChange,
}) => {
  const updateDay = (
    dayOfWeek: number,
    hours: number,
    breakMinutes: number
  ) => {
    const updated = patterns.map((p) =>
      p.dayOfWeek === dayOfWeek
        ? { ...p, hours: Math.max(0, Math.min(24, hours)), breakMinutes: Math.max(0, Math.min(1440, breakMinutes)) }
        : p
    );
    onChange(updated);
  };

  const getDayColor = (dayOfWeek: number) => {
    if (dayOfWeek === 0) return 'text-rose-600 bg-rose-50 border-rose-200';
    if (dayOfWeek === 6) return 'text-blue-600 bg-blue-50 border-blue-200';
    return 'text-slate-700 bg-slate-50 border-slate-200';
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs text-slate-500 pb-1">
        <span>毎週決まっている基本の勤務シフトを設定します。</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
        {patterns.map((item) => {
          const dayName = DAY_NAMES_JA[item.dayOfWeek];
          const isWorking = item.hours > 0;
          const actualHours = Math.max(0, item.hours - item.breakMinutes / 60);

          return (
            <div
              key={item.dayOfWeek}
              className={`p-3.5 rounded-xl border transition flex flex-col justify-between ${
                isWorking
                  ? 'bg-white border-emerald-300 ring-1 ring-emerald-100 shadow-xs'
                  : 'bg-slate-50 border-slate-200 opacity-90'
              }`}
            >
              {/* 曜日バッジ & 実働時間 */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`px-2.5 py-0.5 rounded-md font-bold text-xs border whitespace-nowrap ${getDayColor(
                    item.dayOfWeek
                  )}`}
                >
                  {dayName}曜日
                </span>
                {isWorking ? (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded whitespace-nowrap">
                    実働 {actualHours.toFixed(actualHours % 1 === 0 ? 0 : 1)}h
                  </span>
                ) : (
                  <span className="text-xs text-slate-400 font-medium whitespace-nowrap">休み</span>
                )}
              </div>

              {/* 勤務時間・休憩入力 */}
              <div className="space-y-2.5 bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium flex items-center space-x-1 whitespace-nowrap">
                    <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span>拘束時間</span>
                  </span>
                  <div className="flex items-center space-x-1 flex-shrink-0">
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      max="24"
                      value={item.hours}
                      onChange={(e) =>
                        updateDay(
                          item.dayOfWeek,
                          parseFloat(e.target.value) || 0,
                          item.breakMinutes
                        )
                      }
                      className="w-14 px-2 py-1 text-right font-bold text-xs rounded border border-slate-300 focus:outline-none focus:border-emerald-500 bg-white"
                    />
                    <span className="text-slate-500 text-xs font-medium w-3">h</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 whitespace-nowrap">休憩時間</span>
                  <div className="flex items-center space-x-1 flex-shrink-0">
                    <input
                      type="number"
                      step="15"
                      min="0"
                      max="360"
                      value={item.breakMinutes}
                      onChange={(e) =>
                        updateDay(
                          item.dayOfWeek,
                          item.hours,
                          parseInt(e.target.value, 10) || 0
                        )
                      }
                      className="w-14 px-2 py-1 text-right text-xs rounded border border-slate-300 focus:outline-none focus:border-emerald-500 bg-white"
                    />
                    <span className="text-slate-500 text-xs font-medium w-3">分</span>
                  </div>
                </div>
              </div>

              {/* クイック選択 */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap gap-1.5">
                {PRESET_HOURS.map((preset) => {
                  const isSelected =
                    item.hours === preset.hours &&
                    item.breakMinutes === preset.breakMinutes;
                  return (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() =>
                        updateDay(
                          item.dayOfWeek,
                          preset.hours,
                          preset.breakMinutes
                        )
                      }
                      className={`text-xs px-2 py-1 rounded transition whitespace-nowrap ${
                        isSelected
                          ? 'bg-emerald-600 text-white font-bold shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

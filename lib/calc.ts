import {
  UserShiftSettings,
  SalaryCalculationResult,
  DayShiftSummary,
  TargetCalculationResult,
  IncomeWallResult,
  IncomeWallItem,
} from './types';
import { INCOME_WALL_CONFIGS } from './constants';
import { getDaysInMonth, parseISO, format, getDay } from 'date-fns';

/**
 * 年月文字列 ('YYYY-MM') と設定から、当月の給与・労働時間・交通費を精密計算する
 */
export function calculateMonthlySalary(settings: UserShiftSettings): SalaryCalculationResult {
  const {
    wage,
    transportExpense,
    transportType,
    weeklyPattern,
    customDays,
    targetYearMonth,
  } = settings;

  // 年月をパースして当月の日数を取得
  const targetDate = parseISO(`${targetYearMonth}-01`);
  const daysInMonth = getDaysInMonth(targetDate);
  const [yearStr, monthStr] = targetYearMonth.split('-');
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);

  const daySummaries: DayShiftSummary[] = [];

  let workDaysCount = 0;
  let totalWorkHours = 0;
  let totalBaseSalary = 0;

  for (let day = 1; day <= daysInMonth; day++) {
    const dayStr = String(day).padStart(2, '0');
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${dayStr}`;
    const dateObj = new Date(year, month - 1, day);
    const dayOfWeek = getDay(dateObj); // 0: 日, 1: 月, ... 6: 土

    const custom = customDays[dateStr];
    let hours = 0;
    let breakMinutes = 0;
    let isOff = false;
    let isCustom = false;

    if (custom !== undefined) {
      isCustom = true;
      hours = custom.hours;
      breakMinutes = custom.breakMinutes;
      isOff = custom.isOff;
    } else {
      const pattern = weeklyPattern.find((p) => p.dayOfWeek === dayOfWeek);
      if (pattern) {
        hours = pattern.hours;
        breakMinutes = pattern.breakMinutes;
      }
    }

    // 労働時間・出勤判定
    const breakHours = Math.max(0, breakMinutes / 60);
    const rawActualHours = Math.max(0, hours - breakHours);
    const isWorking = !isOff && rawActualHours > 0;
    const actualWorkHours = isWorking ? Number(rawActualHours.toFixed(2)) : 0;

    // 基本給
    const baseSalary = Math.round(actualWorkHours * wage);

    // 交通費（日額の場合）
    let dayTransport = 0;
    if (isWorking && transportType === 'daily') {
      dayTransport = transportExpense;
    }

    if (isWorking) {
      workDaysCount++;
      totalWorkHours += actualWorkHours;
      totalBaseSalary += baseSalary;
    }

    daySummaries.push({
      dateStr,
      dayOfMonth: day,
      dayOfWeek,
      hours: isOff ? 0 : hours,
      breakMinutes: isOff ? 0 : breakMinutes,
      actualWorkHours,
      baseSalary,
      transportExpense: dayTransport,
      isOff,
      isCustom,
      isWorking,
    });
  }

  // 交通費合計
  let totalTransportExpense = 0;
  if (transportType === 'daily') {
    totalTransportExpense = workDaysCount * transportExpense;
  } else {
    // monthly の場合
    totalTransportExpense = workDaysCount > 0 ? transportExpense : 0;
  }

  const projectedMonthlyIncome = totalBaseSalary + totalTransportExpense;
  const effectiveHourlyWage =
    totalWorkHours > 0
      ? Math.round(projectedMonthlyIncome / totalWorkHours)
      : wage;
  const annualProjectedIncome = projectedMonthlyIncome * 12;

  return {
    targetYearMonth,
    daysInMonth,
    workDaysCount,
    totalWorkHours: Number(totalWorkHours.toFixed(2)),
    totalBaseSalary,
    totalTransportExpense,
    projectedMonthlyIncome,
    effectiveHourlyWage,
    annualProjectedIncome,
    daySummaries,
  };
};

/**
 * 目標月収からの逆算
 */
export function calculateTargetProgress(
  settings: UserShiftSettings,
  salaryResult: SalaryCalculationResult
): TargetCalculationResult {
  const target = Math.max(0, settings.targetMonthlyIncome || 0);
  const currentIncome = salaryResult.projectedMonthlyIncome;
  const shortageAmount = Math.max(0, target - currentIncome);

  const achievementRate =
    target > 0 ? Math.min(100, Math.round((currentIncome / target) * 100)) : 100;

  const workDays = salaryResult.workDaysCount;
  const totalHours = salaryResult.totalWorkHours;

  const averageDailyPay =
    workDays > 0 ? Math.round(currentIncome / workDays) : settings.wage * 4;
  const averageDailyHours =
    workDays > 0 ? Number((totalHours / workDays).toFixed(1)) : 4;

  const validWage = Math.max(1, settings.wage);
  const neededAdditionalHours =
    shortageAmount > 0 ? Math.ceil(shortageAmount / validWage) : 0;

  const neededAdditionalDays =
    neededAdditionalHours > 0 && averageDailyHours > 0
      ? Math.ceil(neededAdditionalHours / averageDailyHours)
      : 0;

  return {
    targetMonthlyIncome: target,
    shortageAmount,
    achievementRate,
    averageDailyPay,
    averageDailyHours,
    neededAdditionalHours,
    neededAdditionalDays,
  };
}

/**
 * 年収の壁シミュレーション計算
 */
export function calculateIncomeWalls(annualProjectedIncome: number): IncomeWallResult {
  const walls: IncomeWallItem[] = INCOME_WALL_CONFIGS.map((config) => {
    const remaining = config.limit - annualProjectedIncome;
    const isExceeded = remaining < 0;
    const progressRate = Math.min(
      100,
      Math.max(0, Math.round((annualProjectedIncome / config.limit) * 100))
    );

    return {
      limit: config.limit,
      name: config.name,
      description: config.description,
      details: config.details,
      remaining: Math.abs(remaining),
      isExceeded,
      progressRate,
    };
  });

  return {
    annualProjectedIncome,
    walls,
  };
}

/**
 * 数値のカンマ区切りフォーマット
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ja-JP').format(Math.round(amount));
}

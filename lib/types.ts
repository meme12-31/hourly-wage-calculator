export type TransportType = 'daily' | 'monthly';

export interface WeeklyShiftPattern {
  dayOfWeek: number; // 0: 日, 1: 月, 2: 火, 3: 水, 4: 木, 5: 金, 6: 土
  hours: number;
  breakMinutes: number;
}

export interface CustomDayShift {
  hours: number;
  breakMinutes: number;
  isOff: boolean;
}

export interface UserShiftSettings {
  wage: number; // 基本時給（円）
  targetMonthlyIncome: number; // 目標月収（円）
  transportExpense: number; // 交通費単価（円）
  transportType: TransportType; // 交通費種別 ('daily' | 'monthly')
  overtimeRate: number; // 残業割増率 (初期値 1.25)
  nightRate: number; // 深夜割増率 (初期値 1.25)
  weeklyPattern: WeeklyShiftPattern[]; // 0〜6の基本シフト
  customDays: Record<string, CustomDayShift>; // 'YYYY-MM-DD' をキーとする個別調整
  targetYearMonth: string; // 'YYYY-MM' (例: '2026-10')
}

export interface DayShiftSummary {
  dateStr: string; // 'YYYY-MM-DD'
  dayOfMonth: number;
  dayOfWeek: number;
  hours: number;
  breakMinutes: number;
  actualWorkHours: number;
  baseSalary: number;
  transportExpense: number;
  isOff: boolean;
  isCustom: boolean;
  isWorking: boolean;
}

export interface SalaryCalculationResult {
  targetYearMonth: string;
  daysInMonth: number;
  workDaysCount: number;
  totalWorkHours: number;
  totalBaseSalary: number;
  totalTransportExpense: number;
  projectedMonthlyIncome: number;
  effectiveHourlyWage: number;
  annualProjectedIncome: number;
  daySummaries: DayShiftSummary[];
}

export interface TargetCalculationResult {
  targetMonthlyIncome: number;
  shortageAmount: number;
  achievementRate: number;
  averageDailyPay: number;
  averageDailyHours: number;
  neededAdditionalHours: number;
  neededAdditionalDays: number;
}

export interface IncomeWallItem {
  limit: number;
  name: string;
  description: string;
  details: string;
  remaining: number;
  isExceeded: boolean;
  progressRate: number;
}

export interface IncomeWallResult {
  annualProjectedIncome: number;
  walls: IncomeWallItem[];
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  category?: string;
  readTime?: string;
}

export interface BlogPost extends BlogPostMeta {
  contentHtml: string;
}

import { UserShiftSettings } from './types';

export const APP_NAME = '時給計算・シフト＆目標逆算ツール';
export const BASE_PATH = '/hourly-wage-calculator';
export const BASE_URL = 'https://hit-tool.com/hourly-wage-calculator';
export const MAIN_SITE_URL = 'https://hit-tool.com/';

export const STORAGE_KEY = 'hourly_wage_calc_settings_v1';

export const DEFAULT_WEEKLY_PATTERN = [
  { dayOfWeek: 0, hours: 0, breakMinutes: 0 }, // 日
  { dayOfWeek: 1, hours: 0, breakMinutes: 0 }, // 月
  { dayOfWeek: 2, hours: 5, breakMinutes: 0 }, // 火
  { dayOfWeek: 3, hours: 0, breakMinutes: 0 }, // 水
  { dayOfWeek: 4, hours: 5, breakMinutes: 0 }, // 木
  { dayOfWeek: 5, hours: 0, breakMinutes: 0 }, // 金
  { dayOfWeek: 6, hours: 8, breakMinutes: 60 }, // 土
];

export const getCurrentYearMonth = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
};

export const DEFAULT_SETTINGS: UserShiftSettings = {
  wage: 1100,
  targetMonthlyIncome: 100000,
  transportExpense: 0,
  transportType: 'daily',
  overtimeRate: 1.25,
  nightRate: 1.25,
  weeklyPattern: DEFAULT_WEEKLY_PATTERN,
  customDays: {},
  targetYearMonth: getCurrentYearMonth(),
};

export const DAY_NAMES_JA = ['日', '月', '火', '水', '木', '金', '土'];

export const INCOME_WALL_CONFIGS = [
  {
    limit: 1030000,
    name: '103万円の壁',
    description: '所得税発生・親や配偶者の扶養控除（特定扶養控除除く）',
    details: '年収が103万円を超えると所得税が発生し、扶養者の税金控除額が縮小・対象外になります。',
  },
  {
    limit: 1060000,
    name: '106万円の壁',
    description: '社会保険加入義務（従業員51人以上の企業・週20時間以上等）',
    details: '一定規模以上の企業で週20時間以上勤務し月給8.8万円以上の場合、健康保険・厚生年金への加入義務が生じます。',
  },
  {
    limit: 1300000,
    name: '130万円の壁',
    description: '社会保険の扶養枠上限（全企業対象）',
    details: '企業規模に関わらず、年収130万円以上になると配偶者や親の社会保険上の扶養から外れ、自身で保険料負担が必要になります。',
  },
  {
    limit: 1500000,
    name: '150万円の壁',
    description: '配偶者特別控除の満額上限',
    details: '配偶者特別控除（最大38万円）を満額受けられる上限です。これを超えると控除額が段階的に減額されます。',
  },
];

export const RELATED_TOOLS = [
  {
    title: 'レシピ人数変更・調味料ｇ変換 | ケーキ型サイズ変更',
    url: 'https://hit-tool.com/recipe-calculator',
    description: '人数の変更やケーキ型のサイズ変更に伴う調味料・材料の分量を自動計算するツール',
  },
  {
    title: 'CalcNote | メモ＆手書きができる無料電卓アプリ',
    url: 'https://hit-tool.com/calcnote',
    description: 'テキストと一緒に計算式を残して自動計算・保存ができる計算メモツール',
  },
  {
    title: '今日の服装ナビ | 天気に合わせた服装提案',
    url: 'https://hit-tool.com/fashion-weather',
    description: '気温や天候に合わせた最適なコーディネートや服装を提案できるツール',
  },
  {
    title: '持ち物チェックリスト | 旅行や出張の準備・持ち物を一覧でスマートにチェック・管理できるツール',
    url: 'https://hit-tool.com/travel-checklist',
    description: '旅行や出張の準備・持ち物を一覧でスマートにチェック・管理できるツール',
  },
];

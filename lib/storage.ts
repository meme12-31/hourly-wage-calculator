import { UserShiftSettings } from './types';
import { STORAGE_KEY, DEFAULT_SETTINGS } from './constants';

export function loadSettingsFromStorage(): UserShiftSettings {
  if (typeof window === 'undefined') {
    return DEFAULT_SETTINGS;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return DEFAULT_SETTINGS;
    }

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') {
      return DEFAULT_SETTINGS;
    }

    return {
      wage: typeof parsed.wage === 'number' && parsed.wage > 0 ? parsed.wage : DEFAULT_SETTINGS.wage,
      targetMonthlyIncome:
        typeof parsed.targetMonthlyIncome === 'number' && parsed.targetMonthlyIncome >= 0
          ? parsed.targetMonthlyIncome
          : DEFAULT_SETTINGS.targetMonthlyIncome,
      transportExpense:
        typeof parsed.transportExpense === 'number' && parsed.transportExpense >= 0
          ? parsed.transportExpense
          : DEFAULT_SETTINGS.transportExpense,
      transportType:
        parsed.transportType === 'daily' || parsed.transportType === 'monthly'
          ? parsed.transportType
          : DEFAULT_SETTINGS.transportType,
      overtimeRate: typeof parsed.overtimeRate === 'number' ? parsed.overtimeRate : DEFAULT_SETTINGS.overtimeRate,
      nightRate: typeof parsed.nightRate === 'number' ? parsed.nightRate : DEFAULT_SETTINGS.nightRate,
      weeklyPattern: Array.isArray(parsed.weeklyPattern) ? parsed.weeklyPattern : DEFAULT_SETTINGS.weeklyPattern,
      customDays: parsed.customDays && typeof parsed.customDays === 'object' ? parsed.customDays : {},
      targetYearMonth:
        typeof parsed.targetYearMonth === 'string' && parsed.targetYearMonth.length === 7
          ? parsed.targetYearMonth
          : DEFAULT_SETTINGS.targetYearMonth,
    };
  } catch (err) {
    console.error('Failed to load settings from localStorage:', err);
    return DEFAULT_SETTINGS;
  }
}

export function saveSettingsToStorage(settings: UserShiftSettings): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (err) {
    console.error('Failed to save settings to localStorage:', err);
  }
}

export function clearSettingsFromStorage(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to remove settings from localStorage:', err);
  }
}

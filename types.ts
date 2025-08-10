export type MealType = 'Завтрак' | 'Обед' | 'Ужин' | 'Перекус';

export interface Preset {
  id: string;
  name: string;
  type: MealType;
  kcal: number;
  p: number;
  f: number;
  c: number;
}

export interface DayMeal {
  slot: MealType;
  presetId: string | null;
  servings: number;
}

export interface Targets {
  kcal: number; p: number; f: number; c: number;
}

export interface Day {
  date: string; // YYYY-MM-DD
  meals: DayMeal[];
}

export interface WeekPlan {
  days: Day[];
  targetKcal: number;
}

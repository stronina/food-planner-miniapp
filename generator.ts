import { Preset, MealType } from "./types";

const slots: MealType[] = ['Завтрак','Обед','Ужин','Перекус'];

export function generateDayPlan(targetCal: number, presets: Preset[]): Preset[] {
  const byType = new Map<MealType, Preset[]>();
  slots.forEach(s => byType.set(s, presets.filter(p => p.type === s)));
  const all = presets.slice();

  let remain = targetCal;
  const plan: Preset[] = [];
  slots.forEach((slot, i) => {
    const pool = (byType.get(slot) || []).length ? (byType.get(slot) as Preset[]) : all;
    const targetForSlot = remain / (slots.length - i);
    const candidates = pool
      .slice()
      .sort((a,b) => Math.abs(a.kcal - targetForSlot) - Math.abs(b.kcal - targetForSlot));
    const best = candidates.find(p => p.kcal <= targetForSlot + 80) ?? candidates[0];
    plan.push(best);
    remain -= best.kcal;
  });
  return plan;
}

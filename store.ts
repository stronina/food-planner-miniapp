"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Day, MealType, Preset, Targets, WeekPlan } from "./types";
import { generateDayPlan } from "./generator";

const slots: MealType[] = ['Завтрак','Обед','Ужин','Перекус'];

const seed: Preset[] = [
  { id: "p01", name:"Сырники + сметана", type:"Завтрак", kcal: 120*2.35 + 60*1.6, p: 14.8*1.2 + 2.6*0.6, f: 9*1.2 + 15*0.6, c: 23.7*1.2 + 3.6*0.6 },
  { id: "p02", name:"Бриошь + мортаделла + салат + майонез", type:"Завтрак", kcal: 50*2.54 + 60*1.835 + 10*0.14 + 15*2.0, p: 50*0.085 + 60*0.145 + 10*0.014 + 15*0.03, f: 50*0.055 + 60*0.131 + 10*0.008 + 15*0.3, c: 50*0.425 + 60*0.019 + 10*0.03 + 15*0.04 },
  { id: "p10", name:"Пельмени (200 г)", type:"Обед", kcal: 200*1.75, p: 200*0.10, f: 200*0.043, c: 200*0.241 },
  { id: "p12", name:"Паста с куриными фрикадельками (275 г)", type:"Обед", kcal: 275*2.03, p: 275*0.10, f: 275*0.09, c: 275*0.20 },
  { id: "p14", name:"Суп щавелевый с курицей (300 г)", type:"Ужин", kcal: 300*0.441, p: 300*0.042, f: 300*0.017, c: 300*0.03 },
  { id: "p16", name:"Камамбер 65 г + хлеб 50 г", type:"Ужин", kcal: 65*2.076 + 50*2.863, p: 65*0.238 + 50*0.097, f: 65*0.124 + 50*0.067, c: 65*0.002 + 50*0.468 },
  { id: "p18", name:"Творог зернёный 130 г + кукуруза 150 г", type:"Перекус", kcal: 130*0.994 + 150*1.18, p: 130*0.108 + 150*0.033, f: 130*0.05 + 150*0.014, c: 130*0.028 + 150*0.217 },
];

interface AppState {
  targets: Targets;
  presets: Preset[];
  today: { date: string; meals: { slot: MealType; presetId: string | null; servings: number }[] };
  week: WeekPlan | null;
  setTargets: (t: Targets) => void;
  addPreset: (p: Preset) => void;
  removePreset: (id: string) => void;
  generateToday: () => void;
  replaceTodayMeal: (idx: number, presetId: string) => void;
  clearToday: () => void;
  generateWeek: (kcal?: number) => void;
  applyWeekDayToToday: (index: number) => void;
}

const todayTemplate = () => ({
  date: new Date().toISOString().slice(0,10),
  meals: slots.map(slot => ({ slot, presetId: null, servings: 1 }))
});

export const useApp = create<AppState>()(persist((set, get) => ({
  targets: { kcal: 1900, p: 100, f: 70, c: 200 },
  presets: seed,
  today: todayTemplate(),
  week: null,
  setTargets: (t) => set({ targets: t }),
  addPreset: (p) => set({ presets: [...get().presets, p] }),
  removePreset: (id) => set({ presets: get().presets.filter(x => x.id !== id) }),
  generateToday: () => {
    const plan = generateDayPlan(get().targets.kcal, get().presets);
    const day = {
      date: new Date().toISOString().slice(0,10),
      meals: plan.map((p,i) => ({ slot: slots[i], presetId: p.id, servings: 1 })),
    };
    set({ today: day });
  },
  replaceTodayMeal: (idx, presetId) => {
    const t = structuredClone(get().today);
    t.meals[idx].presetId = presetId;
    set({ today: t });
  },
  clearToday: () => set({ today: todayTemplate() }),
  generateWeek: (kcal) => {
    const target = kcal ?? get().targets.kcal;
    const days = Array.from({length: 7}).map(() => {
      const plan = generateDayPlan(target, get().presets);
      return {
        date: "",
        meals: plan.map((p,i) => ({ slot: slots[i], presetId: p.id, servings: 1 }))
      };
    });
    set({ week: { days, targetKcal: target } });
  },
  applyWeekDayToToday: (index) => {
    const wk = get().week; if(!wk) return;
    const d = wk.days[index];
    set({ today: { date: new Date().toISOString().slice(0,10), meals: d.meals } });
  }
}), { name: "fp_state_v1" }));

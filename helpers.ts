import { Preset } from "./types";

export function getPresetById(list: Preset[], id: string | null): Preset | null {
  if (!id) return null;
  return list.find(p => p.id === id) || null;
}

export function fmt(n?: number, d = 0) {
  if (typeof n !== "number") return 0;
  const m = Math.pow(10, d);
  return Math.round(n * m) / m;
}

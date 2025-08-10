"use client";

import Nav from "@/components/Nav";
import { useApp } from "@/lib/store";
import { getPresetById, fmt } from "@/lib/helpers";
import { useEffect, useState } from "react";
import { initTelegram } from "@/lib/telegram";

export default function WeekPage(){
  const { targets, presets, week, generateWeek, applyWeekDayToToday } = useApp();
  const [kcal, setKcal] = useState<number>(targets.kcal);

  useEffect(() => { initTelegram(); }, []);

  return (
    <div>
      <Nav />
      <div className="max-w-5xl mx-auto p-4">
        <div className="card">
          <div className="flex gap-2 items-center flex-wrap">
            <div className="chip">Цель (ккал/день)</div>
            <input className="w-28" type="number" value={kcal} onChange={(e)=> setKcal(parseInt(e.target.value||"0"))} />
            <button className="btn-primary" onClick={()=> generateWeek(kcal)}>Сгенерировать неделю</button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          {week?.days.map((d, i) => {
            const totals = d.meals.reduce((acc, m) => {
              const p = getPresetById(presets, m.presetId);
              if(!p) return acc;
              acc.k += p.kcal; acc.p += p.p; acc.f += p.f; acc.c += p.c; return acc;
            }, {k:0,p:0,f:0,c:0});
            return (
              <div key={i} className="card">
                <div className="flex justify-between items-center">
                  <h2>День {i+1}</h2>
                  <div className="chip">Итого: {Math.round(totals.k)} ккал</div>
                </div>
                <div className="mt-2 space-y-2">
                  {d.meals.map((m, idx) => {
                    const p = getPresetById(presets, m.presetId);
                    return (
                      <div key={idx} className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-3">
                        <div className="font-semibold">{m.slot}</div>
                        <div className="small">{p?.name}</div>
                        <div className="small">ккал:{fmt(p?.kcal)} • Б:{fmt(p?.p,1)} Ж:{fmt(p?.f,1)} У:{fmt(p?.c,1)}</div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-3">
                  <button className="btn-ghost" onClick={()=> applyWeekDayToToday(i)}>Подставить на «Сегодня»</button>
                </div>
              </div>
            );
          }) || <div className="text-muted">Сначала сгенерируйте план</div>}
        </div>
      </div>
    </div>
  )
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", label: "Сегодня" },
  { href: "/week", label: "Неделя" },
  { href: "/profile", label: "Профиль" },
];

export default function Nav() {
  const path = usePathname();
  return (
    <nav className="flex gap-2 p-3 sticky top-0 z-20 bg-bg/70 backdrop-blur border-b border-slate-800/60">
      {tabs.map(t => {
        const active = path === t.href;
        return (
          <Link key={t.href} href={t.href} className={`btn ${active ? "btn-primary" : "btn-ghost"}`}>
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}

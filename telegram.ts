export function initTelegram() {
  if (typeof window === 'undefined') return;
  const tg = (window as any).Telegram?.WebApp;
  try {
    tg?.ready();
    tg?.expand();
  } catch {}
  return tg;
}

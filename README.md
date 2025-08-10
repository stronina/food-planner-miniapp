# Food Planner — Telegram Mini App (Next.js + Tailwind)

Готовый стартовый проект для мини‑приложения Telegram:
- вкладки: Сегодня / Неделя / Профиль
- Telegram WebApp API (ready/expand)
- Zustand‑хранилище, генерация дней/недели из пресетов
- Tailwind тёмная тема

## Локальный запуск

```bash
# pnpm i  (или npm i / yarn)
npm i
npm run dev  # http://localhost:3000
```

## Деплой на Vercel

1. Создай новый репозиторий на GitHub.
2. Залей содержимое проекта в репозиторий.
3. В Vercel → **Add New Project** → импортируй репозиторий.
4. Framework: **Next.js**. Остальное по умолчанию.
5. После билда получишь адрес вида `https://<project>.vercel.app`.

## Подключение к Telegram

1. В @BotFather: `/newbot` → получить username.
2. @BotFather → **/mybots → Bot Settings → Menu Button → Edit menu button URL**: укажи `https://<project>.vercel.app`.
3. Открой чат с ботом → кнопка «Открыть» загрузит приложение.

## Где править логику
- `/lib/generator.ts` — подбор блюд на день.
- `/lib/store.ts` — состояние, пресеты, генерация недели/дня.
- `/app/page.tsx` — экран «Сегодня» (замены блюд).
- `/app/week/page.tsx` — экран «Неделя».
- `/app/profile/page.tsx` — цели и CRUD пресетов.

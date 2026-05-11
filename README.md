# TPM Command Center

A personal recruiting command center for Sameeksha Mehrotra's Google TPM / Meta RPM / Microsoft PM internship search (Summer 2027).

## Features

- **Dashboard** — overview with countdowns, stats, upcoming reminders, and latest win
- **Recruiting Timeline** — 5-phase plan with checkable tasks, reminder badges, resource links, and edit mode
- **Company Tracker** — inline-editable table for all target companies with status pipeline
- **Interview Prep** — LeetCode counter with streak tracking + STAR behavioral story bank
- **Weekly Wins** — impact journal with search, filter by tag, and sort

All state is persisted in `localStorage` — nothing resets on refresh.

## Prerequisites

- Node.js 18+ (check with `node -v`)
- npm 9+ (check with `npm -v`)

## Run locally

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

The app opens at **http://localhost:5173**

## Other commands

```bash
npm run build    # production build → ./dist
npm run preview  # preview the production build locally
```

## Tech stack

- **React 18** + **Vite 5**
- **Tailwind CSS 3** (dark mode via class strategy)
- **Lucide React** (icons)
- `localStorage` for all persistence — no backend

## Project structure

```
src/
├── App.jsx                  # Root layout, routing state, dark mode
├── index.css                # Tailwind + global component classes
├── main.jsx                 # React 18 entry point
├── data/
│   └── initialData.js       # Initial state for all sections
├── hooks/
│   └── useLocalStorage.js   # Generic localStorage hook
└── components/
    ├── Sidebar.jsx           # Navigation sidebar
    ├── Dashboard.jsx         # Home overview page
    ├── Timeline.jsx          # 5-phase recruiting timeline
    ├── CompanyTracker.jsx    # Company application table
    ├── InterviewPrep.jsx     # LeetCode + STAR stories
    └── WeeklyWins.jsx        # Impact journal
```

## Resetting data

To start fresh, open browser DevTools → Application → Local Storage → delete all `tpm_*` keys, then reload.

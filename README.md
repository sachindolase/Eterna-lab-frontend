# Axiom Trade - Token Discovery Table

A pixel-perfect replica of Axiom Trade's token discovery table built with Next.js 14, TypeScript, and Tailwind CSS. This project demonstrates modern React patterns, performance optimization, and responsive design.

## 🚀 Features

### Core Features
- **Token Columns**: New pairs, Final Stretch, Migrated categories
- **Interactive Components**: Popover, Tooltip, Modal, Sorting
- **Real-time Updates**: WebSocket mock with smooth color transitions
- **Loading States**: Skeleton loaders, shimmer effects, progressive loading, error boundaries
- **Responsive Design**: Fully responsive from 320px width and up


## What I built (short, human-friendly)
- A responsive token discovery table with three category columns: New Pairs, Final Stretch, and Migrated.
- Interactive controls: column sorting, hover highlights, popovers on token symbols, tooltips on volume, and row-click modals.
- Real-time price updates using a local WebSocket mock that emits price changes every ~2s; UI animates color transitions for up/down changes.
- Robust loading & error UX: skeleton loaders with shimmer, progressive loading patterns, and an error boundary that shows friendly messages.
- Accessibility and performance: Radix UI primitives for accessibility, TypeScript (strict), memoized components, and code-splitting for fast interactions.
- Built with Next.js 14 App Router, Tailwind CSS, Redux Toolkit, and React Query.

## What's in the repo
- UI: `components/atoms`, `components/molecules`, `components/organisms` (atomic architecture)
- Hooks: `hooks/use-token-data.ts`, `hooks/use-websocket.ts`, `hooks/use-sort.ts`
- State: `store/tokenSlice.ts`, `store/authSlice.ts`, `store/store.ts`
- Mock data & WebSocket: `lib/mock-data.ts`, `lib/websocket-mock.ts`
- Entry: Next.js App Router in `app/` (see `app/page.tsx`)

## How to run locally (Windows / PowerShell)
1. Clone and install

```powershell
git clone <repo-url>
cd Eterna-lab-frontend
npm install
```

2. Start dev server

```powershell
npm run dev
```

3. Open `http://localhost:3000` in your browser

4. Build for production

```powershell
npm run build
npm run start
```

Notes: If port 3000 is already in use, run `npx kill-port 3000` or start dev on a different port.

## How to verify features quickly
- Sorting: click any table header to sort (name, price, volume).
- Popovers & tooltips: hover token symbol and volume cells.
- Modal: click a row to open the details dialog.
- Live updates: open DevTools → Console (or Network WS) to see WebSocket ticks and watch price color transitions.
- Loading state: reload the page (first load simulates a 1s API delay) to see skeletons.
- Error state: toggle the mock or force an error in `hooks/use-token-data.ts` to verify the error boundary UI.

## Deployment to Vercel (short)
1. Push this repo to GitHub on branch `main`.
2. In Vercel, choose Import Project → select this repo. Vercel auto-detects Next.js.
3. Confirm build command: `npm run build` (no extra env vars needed).
4. Deploy and open the provided URL. Paste the live URL into this README once deployed.






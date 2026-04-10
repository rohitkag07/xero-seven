# Xero Seven — Agency Website

> React 19 + Vite 8 + TypeScript 5.9 + TailwindCSS 3.4 + InsForge SDK

## About
Xero Seven's live agency website. Deployed on **Vercel** with InsForge backend.

## Key Facts
- **Deploy**: `npx vercel --prod` or push to `main` (auto-deploy)
- **Dev**: `npm run dev` (Vite on localhost:5173)
- **Build**: `npm run build` (tsc + vite build)
- **TailwindCSS**: Locked to v3.4. NEVER upgrade.
- **Design System**: Apple-like minimalism, glassmorphism, dark mode, framer-motion animations
- **Backend**: InsForge BaaS (DB, Auth, Storage, AI, Realtime)
- **Icons**: `lucide-react` + `@phosphor-icons/react`
- **State**: `zustand`
- **Routing**: `react-router-dom`

## Structure
```
src/
├── components/      # Reusable UI components
│   ├── dashboard/   # Agent dashboard components
│   ├── premium/     # Premium landing page sections
│   └── ui/          # Base UI primitives
├── pages/           # Route pages
│   └── dashboard/   # Dashboard sub-pages
├── lib/             # InsForge client, utilities
├── hooks/           # Custom React hooks
└── App.tsx          # Root component with routing
functions/           # Serverless edge functions
public/              # Static assets
```

## Rules
1. Always use InsForge MCP tools (`fetch-docs`) before writing backend code
2. Use `import.meta.env.VITE_*` for environment variables
3. Prefer TypeScript strict mode — no `any` types
4. Components should be under 200 lines — split aggressively

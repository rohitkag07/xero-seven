# Xero Seven

AI agency operating system and public website for Xero Seven, built around a live lead funnel, client dashboard, proposal pipeline, and agent-powered service demos.

Live: https://xero-seven.vercel.app

## What This Is

Xero Seven is the front door for an AI automation agency. The public site explains the offer, captures leads, and routes qualified users into a protected operations dashboard where leads, clients, projects, proposals, analytics, and agent activity can be managed.

This is not a brochure-only site. It is the web layer for a larger autonomous agency stack that includes specialist agents, a Summoner router, memory/RAG infrastructure, and internal dashboards.

## Product Surface

| Area | What it does |
| --- | --- |
| Public website | Premium landing pages for services, process, industries, work, and contact |
| Live AI demo | Chat interface powered by InsForge AI using `gpt-4o-mini` |
| Auth | Login/signup flow for dashboard access |
| Dashboard | Mission control, leads, projects, clients, proposals, analytics, and agents |
| Realtime data | Hooks for realtime leads, clients, projects, proposals, and notifications |
| Brand system | Custom theme store, premium components, responsive UI, and motion |

## Architecture

```text
Visitor / client
  -> React + Vite website
  -> InsForge auth + data layer
  -> Protected dashboard
  -> Xero Seven agent/service backend
```

The frontend is intentionally decoupled from the agent backend. It can evolve as a website, sales surface, or internal agency cockpit without coupling every page to a single backend service.

## Tech Stack

| Layer | Choice |
| --- | --- |
| Frontend | React, Vite, TypeScript |
| Routing | React Router |
| State | Zustand |
| AI/data | InsForge SDK |
| UI | TailwindCSS, Framer Motion, Lucide, Phosphor Icons |
| Deployment | Vercel |

## Local Development

```bash
npm install
npm run dev
```

Build and checks:

```bash
npm run lint
npm run build
```

## Key Files

```text
src/App.tsx                         Route map, auth boundary, dashboard shell
src/pages/HomePage.tsx              Public homepage composition
src/pages/DemoPage.tsx              Live AI demo
src/pages/dashboard/                Protected operating dashboard
src/hooks/useRealtime*.ts           Realtime data hooks
src/lib/insforge.ts                 InsForge client
src/stores/                         Theme, filters, orchestration state
```

## Positioning

Xero Seven is built for Indian SMBs and service businesses that need practical automation: lead capture, WhatsApp workflows, dashboards, AI support, internal tools, and agent-backed operations.

The long-term direction is a closed-loop agency engine: prospecting, qualification, proposal generation, project execution, QA, support, and reporting coordinated through specialist AI agents.

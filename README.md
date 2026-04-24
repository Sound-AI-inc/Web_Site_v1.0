# SoundAI Website

Marketing and public-facing website for SoundAI Inc. — landing page, company /
product pages, resources (blog, docs, API, support, FAQ), legal pages, and the
`/coming-soon` + `/auth` placeholders.

The SaaS dashboard (audio generator, editor, library, MIDI, etc.) lives in a
separate repository: [`Sound-AI-inc/Web_Interface_v1.5.3`](https://github.com/Sound-AI-inc/Web_Interface_v1.5.3).

## Stack

- React 18 + TypeScript
- Vite 6
- Tailwind CSS 3
- React Router 7 (lazy-loaded routes with `Suspense`)
- Lucide React (icons)

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build
npm run lint
```

## Project structure

```
src/
├── App.tsx                 # Route definitions (lazy-loaded)
├── main.tsx                # Entry point + ThemeProvider
├── index.css               # Tailwind layers + shared utility classes
├── components/             # Shared UI (Header, Footer, Layout, SectionHeading)
├── context/                # ThemeContext (light/dark toggle)
├── lib/                    # clsx + tailwind-merge helper
├── pages/
│   ├── Home.tsx
│   ├── Auth.tsx
│   ├── ComingSoon.tsx
│   ├── company/            # About, Team, Roadmap, Careers
│   ├── products/           # ForUsers, ForDevelopers, ForInvestors, ForPartnerships
│   ├── resources/          # Blog, Documentation, Api, Support, Faq
│   └── legal/              # Terms, Privacy, LegalCenter, Licenses, LegalInfo
└── assets/
```

## Split from Web_Interface_v1.5.3

This repository was extracted from the combined mono-repo that previously
hosted both the marketing website and the SaaS dashboard. The split keeps each
surface independently deployable with its own dependency graph — the website
no longer ships `tone`, `wavesurfer.js`, `@tonejs/midi`,
`@supabase/supabase-js`, `zustand`, `recharts`, `class-variance-authority`, or
`audiobuffer-to-wav`. Production bundle is ~312 kB (≈ 88 kB gzipped) vs
~849 kB in the combined repo.

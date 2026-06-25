# MedTour Kazakhstan

A premium medical tourism platform connecting international patients with accredited hospitals in Kazakhstan. Compare hospitals, explore treatments, book accommodation, and get 24/7 personalized assistance — all on one platform.

## Tech stack

- **Next.js 16** (App Router)
- **TypeScript** (strict)
- **Tailwind CSS v4**
- **Framer Motion** (animations)
- **Lucide React** (icons)

## Features

- Hero, statistics, partner hospitals, treatments, featured clinics, hotels, packages, tourism, how-it-works, trust indicators, contact center, testimonials, and CTA sections
- **Live treatment search** filtering real clinic data by specialty (client-side, no backend)
- **Medical Concierge** chat experience with realistic patient scenarios
- **Internationalization** in 8 languages (English, Russian, Kazakh, Uzbek, Kyrgyz, Tajik, Arabic, Chinese) with **RTL support** for Arabic
- SEO: dynamic Open Graph image, sitemap, robots, canonical + language alternates
- Accessible, responsive, and motion-reduced friendly

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Run the production server |
| `npm run lint` | Lint with ESLint |

## Environment variables

Copy `.env.example` to `.env.local` and set your production domain:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

This drives canonical URLs, `robots.txt`, `sitemap.xml`, and Open Graph metadata.

## Deploy to Vercel

1. Push this repository to GitHub/GitLab/Bitbucket.
2. Import the project in [Vercel](https://vercel.com/new) — the framework is auto-detected.
3. Add the `NEXT_PUBLIC_SITE_URL` environment variable in **Project Settings → Environment Variables**.
4. Deploy. No `vercel.json` is required.

## Project structure

```
app/                 App Router entry, metadata, robots, sitemap, OG image
components/
  layout/            Navbar, Footer
  sections/          Page sections
  ui/                Shared UI (AnimatedSection, LanguageSelector)
lib/
  data/              TypeScript mock data (clinics, hotels, packages, ...)
  i18n/              Locale config, provider, translation JSON
```

## Notes on data

Clinic and hospital information is based on publicly available data about real
institutions in Kazakhstan. Treatment prices are shown as **estimated ranges** —
final costs are confirmed after an individual consultation.

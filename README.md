# Rohit Manvar — Personal Portfolio

Welcome to the codebase for my personal portfolio website. This is my digital space where I showcase my projects, skills, and coding activity.

Built with Next.js, styled with Tailwind CSS, and brought to life with Three.js and Framer Motion. Automatically deployed to GitHub Pages and always up-to-date.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [How to Make This Your Own](#how-to-make-this-your-own)
- [Deployment](#deployment)


## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & shadcn/ui
- **3D & Animation**: Three.js, React Three Fiber & Framer Motion
- **Maps**: React Leaflet & react-simple-maps
- **Deployment**: GitHub Pages with GitHub Actions
- **Package Manager**: pnpm

## Quick Start

```bash
git clone https://github.com/rohitmanvar/rohitmanvar.github.io.git
cd rohitmanvar.github.io
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view it locally.

## How to Make This Your Own

### 1. Personalize Your Info

All personal data (name, bio, experience, projects, skills) lives in one file:

```
src/data/resume.tsx
```

### 2. Update Your GitHub Graph

In `src/app/page.tsx`, find the `<GitHubContributions />` component and change the `username` prop to your GitHub username. No token or environment variable needed.

### 3. Update the Maps

- **World map**: edit the `visitedCountries` array in `src/components/world-map.tsx`
- **Hong Kong map**: update the `locations` object in `src/components/hong-kong-map.tsx`

## Deployment

The portfolio auto-deploys to GitHub Pages on every push to `main`. The workflow at `.github/workflows/deploy.yml` handles the build and deployment automatically.

---

Feel free to fork and build your own version!

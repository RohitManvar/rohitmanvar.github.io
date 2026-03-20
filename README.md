# Rohit Manvar — Personal Portfolio

Welcome to the codebase for my personal portfolio website. This is my digital space where I showcase my projects, skills, and coding activity.

Built with Next.js, styled with Tailwind CSS, and brought to life with Three.js and Framer Motion. Automatically deployed to GitHub Pages and always up-to-date.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [How to Make This Your Own](#how-to-make-this-your-own)
- [Deployment](#deployment)

## Features

### Interactive 3D Visualizations

- **Rubik's Cube Solver** (`/src/components/rubiks-cube.tsx`): A fully interactive 3D Rubik's Cube that visualizes the CFOP solving method, breaking down the solution into Cross, F2L, OLL, and PLL stages.

- **Protein Folding Viewer** (`/src/components/protein-folding.tsx`): Inspired by AlphaFold, this visualizer shows how a protein chain folds into its 3D structure with pLDDT confidence score coloring and a Predicted Aligned Error (PAE) plot.

- **Torus-Mug Morph** (`/src/components/torus-mug-morph.tsx`): An interactive demo of topological equivalence — morph a 3D torus into a coffee mug using a slider.

### Data-Driven Maps

- **World Map** (`/src/components/world-map.tsx`): Highlights countries I've visited, built with react-simple-maps.

- **Hong Kong Map** (`/src/components/hong-kong-map.tsx`): A map of favorite spots built with react-leaflet with custom markers.

### Dynamic & UI Features

- **GitHub Contribution Graph** (`/src/components/github-contributions.tsx`): Live coding activity graph fetched from a public GitHub contributions API. Fully responsive with horizontal scroll on mobile. No token required.

- **Aquarium Mode** (`/src/components/aquarium.tsx`): A toggleable full-screen overlay with animated fish and shrimp.

- **Smooth Animations** (`/src/components/magicui/`): Fluid animations powered by Magic UI, included directly for full customization (Dock navigation, BlurFade effects).

- **MDX Blog** (`/src/app/blog/`): Blog powered by MDX — write in Markdown and embed React components inline.

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

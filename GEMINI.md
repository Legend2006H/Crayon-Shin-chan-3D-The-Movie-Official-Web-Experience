# Antigravity Agent Guidelines — Crayon Shin-chan 3D Official Experience

Welcome to the **Crayon Shin-chan 3D Official Web Experience** codebase. This file specifies operational conventions, design principles, architecture constraints, and maintenance workflows for Google Antigravity and AI agents.

---

## 🎯 1. Project Mission & Identity

- **Project Name**: `crayon-shinchan-3d-experience`
- **Theme**: Theatrical promotional website for *Crayon Shin-chan 3D: The Movie* (野原しんのすけ 3D 超次元体験).
- **Core Experience**: A vibrant, high-energy, cinematic web portal blending Japanese Tokusatsu / Manga pop-art styling with modern web technologies (interactive character codex, playable mini-games, living cinema video stage, and native sound synthesis).

---

## 🛠️ 2. Technology Stack & Hard Constraints

| Tool | Version | Purpose |
| :--- | :--- | :--- |
| **Framework** | React 19 (`^19.0.1`) | UI component architecture |
| **Language** | TypeScript (`^7.0.2` / `^5.7+`) | Strict type safety (`strict: true`) |
| **Bundler** | Vite 8 (`^8.3.0`) | Instant HMR and optimized production bundling |
| **Styling** | Tailwind CSS v4 (`^4.3.3`) | Modern CSS utilities via `@tailwindcss/vite` |
| **Animation** | Motion (`^12.23.24`) | Micro-interactions and hardware-accelerated transitions |
| **Icons** | Lucide React (`^0.546.0`) | Crisp vector iconography |
| **Audio** | Native Web Audio API | Zero-latency, zero-bandwidth sound effect synthesis |

> [!IMPORTANT]
> **Static SPA Constraint**: This application is a 100% client-side Single Page Application. Do NOT introduce backend servers (Express, Fastify, etc.) or external database drivers into the core app. All state is local and client-rendered.

---

## 🎨 3. Design System & Aesthetics Guidelines

1. **Rich Aesthetics Mandate**:
   - Every interface element should feel alive, polished, and premium.
   - Use curated color accents per character (Shin-chan Red/Green, Shiro Pure White/Cyan, Action Kamen Emerald/Gold, Himawari Amber, Buriburizaemon Violet, Kazama Sapphire).
   - Glassmorphic backdrops (`backdrop-blur-md`, subtle borders `border-white/10` or `border-neutral-800`).
2. **Typography Hierarchy**:
   - Display Headings: `Bebas Neue`, `Syne`
   - Japanese Typography: `Noto Sans JP`
   - Body & Interface: `Plus Jakarta Sans`, `Montserrat`
3. **Audio Experience**:
   - Utilize the built-in [src/utils/audio.ts](file:///c:/Users/Shind/Downloads/disney-big-hero-6-official-experience/src/utils/audio.ts) synthesizer for UI feedback (beeps, power-ups, giggles, clashes).
   - Never import heavyweight external `.mp3` or `.wav` sound files unless explicitly requested. The native Web Audio API keeps the bundle ultra-fast.
4. **Interactive HUD**:
   - Reticle inspection targets must remain responsive and informative.
   - Modals (Trailers, Tickets, Wallpapers, Legal) must support ESC key closing and mobile viewport adaptations.

---

## 📁 4. Repository & File Structure Rules

```text
disney-big-hero-6-official-experience/
├── docs/                      # Technical documentation & screenshots
│   ├── ARCHITECTURE.md        # System architecture & component tree
│   └── screenshots/           # Documentation preview assets
├── public/                    # Static runtime assets
│   ├── images/characters/     # Transparent character PNGs
│   ├── images/ui/             # UI backdrops & posters
│   └── videos/                # Loopable 3D MP4 animations
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── art/               # Character graphic visualizers
│   │   ├── modals/            # Overlay dialogs (Trailers, Tickets, Wallpapers, Legal)
│   │   ├── CharacterSection.tsx
│   │   ├── CharacterSelectorBar.tsx
│   │   ├── GamesSection.tsx
│   │   ├── Header.tsx
│   │   ├── LivingCinemaSection.tsx
│   │   ├── MovieBanner.tsx
│   │   ├── NavigationDrawer.tsx
│   │   └── ReticleTarget.tsx
│   ├── data/
│   │   └── characters.ts      # Structured character data & reticle points
│   ├── utils/
│   │   └── audio.ts           # Web Audio API procedural synthesizer
│   ├── App.tsx                # Application shell & state coordinator
│   ├── index.css              # Global styles & Tailwind v4 theme
│   └── main.tsx               # DOM mount point
├── GEMINI.md                  # This file
├── README.md                  # Public GitHub presentation
├── LICENSE                    # MIT License
└── vite.config.ts             # Vite build configuration
```

> [!CAUTION]
> **Keep Root Directory Clean**:
> - Never save raw exports, temporary videos, or loose test screenshots at the project root.
> - Screenshots belong in `docs/screenshots/`.
> - Character artwork belongs in `public/images/characters/`.
> - Always update `.gitignore` if introducing tools that generate local cache directories.

---

## ⚡ 5. Verification & Testing Workflows

Before pushing changes to GitHub or submitting tasks, always run:

```bash
# 1. Verify TypeScript types (zero errors allowed)
npm run lint

# 2. Verify production build (must compile cleanly into dist/)
npm run build
```

---

## 🚀 6. Deployment Rules

- **Platform Agnostic**: Deploys seamlessly to Vercel, Render, Netlify, Cloudflare Pages, or GitHub Pages.
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Public URL routing**: Clean relative or root-relative paths (`/`).

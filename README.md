# Crayon Shin-chan 3D The Movie // Official Web Experience
### 野原しんのすけ 3D 超次元体験 — Kasukabe Defense Force Theatrical Portal

<div align="center">

[![React](https://img.shields.io/badge/React-19.0-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Motion](https://img.shields.io/badge/Motion-12.2-ff0055?style=for-the-badge&logo=framer&logoColor=white)](https://motion.dev/)
[![License](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](LICENSE)

**An ultra-modern, cinematic, interactive promotional web experience inspired by the 3D animated theatrical world of Crayon Shin-chan.**

[Features](#-key-features) • [Preview Gallery](#-visual-gallery) • [Tech Stack](#-technology-stack) • [Architecture](docs/ARCHITECTURE.md) • [Project Structure](#-project-structure) • [Getting Started](#-getting-started-locally)

</div>

---

## 🌟 Overview

The **Crayon Shin-chan 3D Official Experience** is a high-performance, responsive single-page web application engineered to celebrate the theatrical release of *Crayon Shin-chan 3D The Movie*. 

Built with **React 19**, **Vite**, **TypeScript**, and **Tailwind CSS v4**, the application delivers a studio-grade interactive experience featuring smooth typography, dynamic micro-interactions, an in-browser Web Audio synthesizer, full character showcases with interactive holographic reticles, playable arcade mini-games, and a living 3D cinema stage.

---

## ✨ Key Features

### 🦸 1. Theatrical Character Showcase & Holographic Reticles
- **6 Full-Fledged Character Profiles**: Detailed profiles, Japanese voice line quotes, personality specs, and traits for **Shin-chan**, **Shiro**, **Action Kamen**, **Himawari**, **Buriburizaemon**, and **Toru Kazama**.
- **Hero & Civilian Mode Switcher**: Instantly toggle between Shin-chan's standard kindergarten attire and his cosmic superhero outfit.
- **Interactive Holographic Reticle Points**: Clickable inspection nodes positioned across character models reveal lore tidbits, costume schematics, and comedic commentary.

### 🕹️ 2. Kasukabe Arcade (Playable Mini-Games)
- **Butt-Alien Telekinesis**: Tap to charge psychic energy and bounce incoming cosmic rocks to score combos.
- **Chocobi Crunch Catch**: Catch falling boxes of Shin-chan's favorite snack before time runs out.
- **Action Beam Showdown**: Rapid-tap beam clashing battle against invaders with dynamic power bars.
- **Zero-Dependency Web Audio Synth**: Custom synthesized sound effects (chimes, clicks, power blasts, giggles) powered entirely by the native HTML5 Web Audio API.

### 🎬 3. Living 3D Cinema & Video Stage
- Seamless looping 3D character walk animation showcasing stylized CGI physics.
- Theatrical multi-trailer carousel modal with official video playback and HD poster previews.
- Fullscreen cinema mode and immersive dark backdrop styling.

### 🎟️ 4. Box Office & Fan Downloads
- **Interactive Ticket Finder**: Search nearby theaters by ZIP / postal code with live seat availability simulation and calendar showtime selectors.
- **Wallpaper Download Center**: High-resolution wallpaper generator supporting both 16:9 widescreen desktop and 9:16 mobile formats.
- **Studio Navigation Drawer & Slide Spy**: Fixed HUD floating character dock with audio toggles, slide mode jump shortcuts, and legal disclaimers.

---

## 📸 Visual Gallery

| Character Showcase | Interactive Reticle Inspection |
| :---: | :---: |
| ![Character Showcase](docs/screenshots/character_showcase.png) | ![Interactive Reticle Inspection](docs/screenshots/interactive_reticle_inspection.png) |

| Kasukabe Arcade Mini-Games | Living 3D Cinema Showcase |
| :---: | :---: |
| ![Kasukabe Arcade Game](docs/screenshots/kasukabe_arcade_game.png) | ![Living 3D Cinema](docs/screenshots/living_3d_cinema.png) |

<div align="center">

### Complete Landing Page Experience
![Complete Landing Page](docs/screenshots/complete_landing_page.png)

</div>

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | [React 19](https://react.dev/) + [React DOM 19](https://react.dev/) |
| **Build Tooling** | [Vite 8](https://vitejs.dev/) (Lightning-fast HMR and optimized Rollup bundling) |
| **Language** | [TypeScript 5.7+](https://www.typescriptlang.org/) (Strict type checking) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/vite` |
| **Animations** | [Motion (Framer Motion v12)](https://motion.dev/) & Hardware-accelerated CSS transitions |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Audio** | Native Web Audio API Sound Synthesizer (zero external MP3 bandwidth needed) |

---

## 📁 Project Structure

```text
disney-big-hero-6-official-experience/
├── public/
│   ├── images/
│   │   ├── characters/          # High-resolution character cutouts (Shin-chan, Shiro, etc.)
│   │   └── ui/                  # UI posters and promotional banners
│   └── videos/
│       └── shinchan_3d_walk.mp4 # 3D looping character walking sequence
├── docs/
│   └── screenshots/             # Showcase preview images used in documentation
├── src/
│   ├── components/
│   │   ├── art/
│   │   │   └── ShinchanCharacterArt.tsx  # Dynamic character image renderer
│   │   ├── modals/
│   │   │   ├── LegalModal.tsx            # Copyright & licensing information
│   │   │   ├── TicketModal.tsx           # Box office ticket search simulation
│   │   │   ├── TrailerModal.tsx          # Video player with multi-trailer carousel
│   │   │   └── WallpaperModal.tsx        # High-res poster & wallpaper downloads
│   │   ├── CharacterSection.tsx          # Full-height character showcase section
│   │   ├── CharacterSelectorBar.tsx      # Floating bottom dock with sound & modal triggers
│   │   ├── GamesSection.tsx              # Kasukabe Arcade interactive mini-games
│   │   ├── Header.tsx                    # Studio header with movie banner & ticker
│   │   ├── LivingCinemaSection.tsx       # Embedded continuous 3D video display
│   │   ├── MovieBanner.tsx               # Animated movie marquee banner
│   │   ├── NavigationDrawer.tsx          # Right-side overlay quick-navigation menu
│   │   └── ReticleTarget.tsx             # Interactive pulsing inspection points
│   ├── data/
│   │   └── characters.ts                 # Character stats, quotes, lore, reticle coordinates
│   ├── utils/
│   │   └── audio.ts                      # Web Audio API sound FX generator
│   ├── App.tsx                           # Master orchestrator component
│   ├── index.css                         # Tailwind CSS v4 styling & custom typography
│   └── main.tsx                          # React 19 application mount
├── .env.example                          # Environment variables template
├── .gitignore                            # Comprehensive production ignore patterns
├── index.html                            # Semantic HTML5 entry with Google Fonts & OpenGraph
├── package.json                          # Dependencies and npm scripts
├── tsconfig.json                         # TypeScript compiler configuration
└── vite.config.ts                        # Vite configuration with Tailwind CSS plugin
```

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js**: `v18.0.0` or higher (`v20.x` or `v22.x` recommended)
- **Package Manager**: `npm`, `pnpm`, or `yarn`

### Installation & Run

1. **Clone or Navigate to the Repository**:
   ```bash
   git clone https://github.com/<your-username>/<your-repo-name>.git
   cd <your-repo-name>
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173` (or the URL displayed in your terminal).

4. **Type Check**:
   ```bash
   npm run lint
   ```

5. **Production Build**:
   ```bash
   npm run build
   ```
   Compiled, minified, production-ready static assets will be output to the `dist/` directory.

6. **Preview Production Build**:
   ```bash
   npm run preview..........
   ```

---

## 📄 License & Credits

This project was built for educational and portfolio demonstration purposes as an homage to the official *Crayon Shin-chan* franchise created by Yoshito Usui / Futabasha, Shin-Ei Animation, TV Asahi, and ADK.

Released under the [MIT License](LICENSE).


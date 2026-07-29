<div align="center">
  <img src="https://res.cloudinary.com/dbjjzyrr3/image/upload/v1772696070/Taigra_Nexus_Labs_logo.png" alt="Taigra Nexus Lab Logo" width="120" />

  # Taigra Nexus Lab

  ### The Official Tech Arm of Taigour Group of Organization (TGO)

  [![Version](https://img.shields.io/badge/version-2.0.0-blue?style=for-the-badge)](https://github.com/TaigourGroup/Taigra-Nexus-Lab)
  [![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
  [![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
  [![Three.js](https://img.shields.io/badge/Three.js-0.185-000000?style=for-the-badge&logo=threedotjs&logoColor=white)](https://threejs.org)
  [![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com)
  [![License](https://img.shields.io/badge/license-Proprietary-red?style=for-the-badge)]()

  *Enterprise-grade digital infrastructure powering the entire TGO ecosystem.*

  [Live Site](https://taigranexuslabs.onrender.com) · [Report Bug](https://github.com/TaigourGroup/Taigra-Nexus-Lab/issues) · [Request Feature](https://github.com/TaigourGroup/Taigra-Nexus-Lab/issues)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Design System](#-design-system)
- [Features](#-features)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [Scripts](#-scripts)
- [Deployment](#-deployment)
- [Legal](#-legal)
- [Contact](#-contact)

---

## 🏢 About

**Taigra Nexus Lab Pvt. Ltd.** is the specialized technology division of **Taigour Group of Organization (TGO)**, headquartered in Janakpurdham, Madhesh Province, Nepal. We build and maintain the digital backbone for over 12 child companies within the TGO ecosystem — from logistics and real estate to finance and esports.

This repository contains the official corporate website and admin platform for Taigra Nexus Lab, serving as the public-facing showcase of our capabilities, project portfolio, blog, services, and internal management tools.

---

## 🛠️ Tech Stack

| Layer        | Technology                                                                          |
| ------------ | ----------------------------------------------------------------------------------- |
| **Frontend** | React 19, Vite 6, React Router 7, Framer Motion 12, Tailwind CSS (CDN)             |
| **3D / FX**  | Three.js (hero nexus network), Web Audio API (brand impact sound)                   |
| **Backend**  | Node.js, Express 4                                                                  |
| **Database** | Supabase (PostgreSQL)                                                               |
| **Icons**    | Lucide React, Font Awesome (brands)                                                 |
| **Fonts**    | Plus Jakarta Sans (Google Fonts)                                                    |
| **Tooling**  | Concurrently, dotenv                                                                |

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                         Client (Vite + React)                │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌───────────────┐   │
│  │  Home    │ │ Services │ │ Projects │ │ Admin Panel   │   │
│  │  About   │ │ Blogs    │ │ Contact  │ │ (Dashboard)   │   │
│  └──────────┘ └──────────┘ └──────────┘ └───────────────┘   │
│                          │                                    │
│                     :3000 (dev proxy)                        │
└──────────────────────────┬───────────────────────────────────┘
                           │  /api/*
┌──────────────────────────▼───────────────────────────────────┐
│                   Express API Server (:10000)                 │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  Generic CRUD: /api/projects · /api/blogs · /api/services│ │
│  │  Auth:         /api/login                                │ │
│  └─────────────────────────────────────────────────────────┘ │
│                          │                                    │
└──────────────────────────┬───────────────────────────────────┘
                           │
┌──────────────────────────▼───────────────────────────────────┐
│                  Supabase (PostgreSQL)                        │
│  Tables: projects · blogs · services                         │
└──────────────────────────────────────────────────────────────┘
```

---

## 🎨 Design System

Minimal light theme — white surfaces, ink-gray text, **royal red (`#BC3232`)** accent. Defined as CSS custom properties in `index.css` plus a matching Tailwind config (`royal` / `ink` palettes) in `index.html`.

| Element | Treatment |
| --- | --- |
| **Brand mark** | Inline SVG (`components/Logo.jsx`) — recolorable `dark`/`light` variants; animated mode flies the pieces in from off-canvas and "collides" them into place with an impact shake + synthesized metal-clang (Web Audio) |
| **Navbar** | Floating glass island — rounded blurred card, sliding dark active pill (Framer Motion `layoutId`), pill Contact CTA |
| **Hero** | Three.js "nexus" constellation (`components/ThreeScene.jsx`) — drifting node network, pointer parallax, respects `prefers-reduced-motion`, full GL cleanup on unmount |
| **Cards / buttons** | `.nexus-card`, `.btn-primary`, `.btn-secondary` utility classes in `index.css` |
| **Typography** | Plus Jakarta Sans, tight tracking on headings |

---

## ✨ Features

### Public Website
- 🏠 **Home** — Three.js nexus hero, animated brand mark, TGO heritage showcase, featured projects
- 📖 **About** — Company story, mission, and the TGO ecosystem
- 🔧 **Services** — Full catalog of our technical offerings
- 💼 **Projects** — Portfolio of enterprise systems we've built
- 📝 **Blogs** — Technical articles and company updates
- 📬 **Contact** — Contact form with embedded Google Maps
- 🍪 **Cookie Consent** — GDPR-compliant cookie banner
- 🎓 **Interactive Tutorial** — Guided onboarding walkthrough for first-time visitors

### Admin Panel
- 🔐 **Secure Login** — Credential-based admin authentication
- 📊 **Dashboard** — Full CRUD management for projects, blogs, and services
- ⚡ **Real-time sync** — All changes persist instantly to Supabase

### Performance & UX
- 🚀 **Loading Screen** — Branded splash with pulsing logo and minimum display time
- ✨ **Framer Motion Animations** — Smooth page transitions, scroll reveals, logo collision intro
- ♿ **Accessible** — Skip link, focus-visible outlines, `prefers-reduced-motion` support
- 📱 **Fully Responsive** — Mobile-first design across all pages
- 🔍 **SEO Optimized** — Meta tags, sitemap, robots.txt, and Google verification

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x
- A [Supabase](https://supabase.com) project with `projects`, `blogs`, and `services` tables

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/TaigourGroup/Taigra-Nexus-Lab.git
   cd Taigra-Nexus-Lab
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables** (see [below](#-environment-variables))

4. **Start the development server**

   ```bash
   npm run dev
   ```

   This launches both the Vite dev server (`:3000`) and the Express API server (`:10000`) concurrently.

5. **Open in browser**

   ```
   http://localhost:3000
   ```

---

## 🔒 Environment Variables

Create a `.env` file in the project root with the following keys:

| Variable              | Description                              |
| --------------------- | ---------------------------------------- |
| `SUPABASE_URL`        | Your Supabase project URL                |
| `SUPABASE_SERVICE_KEY` | Supabase service role key (server-side) |
| `USERNAME_KEY`        | Admin panel login username               |
| `PASSWORD_KEY`        | Admin panel login password               |

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key
USERNAME_KEY=admin
PASSWORD_KEY=your-secure-password
```

> ⚠️ **Never commit `.env` to version control.** It is already listed in `.gitignore`.

---

## 📁 Project Structure

```
Taigra-Nexus-Lab/
├── components/              # Reusable UI components
│   ├── Admin/               # Admin-specific components
│   │   ├── adminConfig.js       # Field/content-type config for CRUD forms
│   │   ├── AdminItemForm.jsx    # Create/edit form
│   │   ├── AdminItemList.jsx    # Item listing with actions
│   │   ├── AdminOverview.jsx    # Dashboard overview cards
│   │   └── AdminToast.jsx       # Toast notifications
│   ├── CookieConsent.jsx    # GDPR cookie banner + settings link
│   ├── Layout.jsx           # Floating island navbar + footer shell
│   ├── LoadingScreen.jsx    # Branded splash (pulsing logo)
│   ├── Logo.jsx             # Inline SVG brand mark (collision intro + clang)
│   ├── PageHero.jsx         # Reusable page hero / section heading
│   ├── ThreeScene.jsx       # Three.js nexus network for the home hero
│   └── Tutorial.jsx         # Interactive onboarding walkthrough
├── pages/                   # Route-level page components
│   ├── Admin/
│   │   ├── Dashboard.jsx        # CRUD dashboard
│   │   └── Login.jsx            # Admin login
│   ├── About.jsx
│   ├── Blogs.jsx
│   ├── Contact.jsx
│   ├── Home.jsx
│   ├── Projects.jsx
│   └── Services.jsx
├── services/                # Data access layer
│   └── dbService.js         # API client for Express backend
├── utils/                   # Utility modules
│   └── cookieConsent.js     # Cookie consent read/apply logic
├── data/                    # Seed/fallback JSON content
│   ├── blogs.json
│   ├── projects.json
│   └── services.json
├── public/                  # Static assets & legal pages
│   ├── legal.css            # Shared styles for legal pages
│   ├── legal-lang.js        # Language toggle for legal pages
│   ├── privacy-policy.html
│   ├── terms-of-service.html
│   ├── sitemap.xml
│   └── robot.txt
├── App.jsx                  # Root component with routing
├── index.jsx                # React entry point
├── index.html               # HTML shell (Tailwind CDN config, fonts)
├── index.css                # Global styles & design tokens
├── constants.js             # Brand constants & config
├── types.js                 # Shared type definitions
├── logo.html                # Original brand mark SVG reference
├── metadata.json            # App metadata
├── server.js                # Express API + Supabase integration
├── vite.config.js           # Vite configuration
├── jsconfig.json            # Editor path/intellisense config
├── package.json
└── .env                     # Environment variables (not committed)
```

---

## 📜 Scripts

| Command           | Description                                         |
| ----------------- | --------------------------------------------------- |
| `npm run dev`     | Start both client & server in development mode      |
| `npm run client`  | Start only the Vite dev server                      |
| `npm run server`  | Start only the Express API server                   |
| `npm run build`   | Create production build via Vite                    |
| `npm run preview` | Preview the production build locally                |

---

## 🌐 Deployment

The application is designed for deployment on platforms like **Render**, **Railway**, or any Node.js hosting provider.

1. **Build the client**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm run server
   ```
   The Express server serves the built `dist/` folder as static files with SPA fallback routing.

3. **Set environment variables** on your hosting platform matching the `.env` configuration.

---

## ⚖️ Legal

- [Privacy Policy](public/privacy-policy.html)
- [Terms of Service](public/terms-of-service.html)

---

## 📍 Contact

**Taigra Nexus Lab Pvt. Ltd.**
Pidari, Janakpurdham, Dhanusha District
Madhesh Province, Nepal

📧 Reach us through the [Contact Page](https://taigranexuslabs.onrender.com/#/contact)
🕐 Sunday – Friday · 10:00 AM – 6:00 PM

---

<div align="center">

  **Built with ❤️ by [Taigra Nexus Lab](https://taigranexuslabs.onrender.com) — A TGO Company**

  *© 2026 Taigra Nexus Lab Pvt. Ltd. All rights reserved.*

</div>

<div align="center">
  <img src="https://res.cloudinary.com/dbjjzyrr3/image/upload/v1772696070/Taigra_Nexus_Labs_logo.png" alt="Taigra Nexus Labs Logo" width="120" />

  # Taigra Nexus Labs

  ### The Official Tech Arm of Taigours Group of Organization (TGO)

  [![Version](https://img.shields.io/badge/version-1.3.0-blue?style=for-the-badge)](https://github.com/Taigours-Group/Taigra-Nexus-Lab)
  [![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
  [![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
  [![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com)
  [![License](https://img.shields.io/badge/license-Proprietary-red?style=for-the-badge)]()

  *Enterprise-grade digital infrastructure powering the entire TGO ecosystem.*

  [Live Site](https://taigranexuslabs.onrender.com) · [Report Bug](https://github.com/Taigours-Group/Taigra-Nexus-Lab/issues) · [Request Feature](https://github.com/Taigours-Group/Taigra-Nexus-Lab/issues)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
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

**Taigra Nexus Labs Pvt. Ltd.** is the specialized technology division of **Taigours Group of Organization (TGO)**, headquartered in Janakpurdham, Madhesh Province, Nepal. We build and maintain the digital backbone for over 12 child companies within the TGO ecosystem — from logistics and real estate to finance and esports.

This repository contains the official corporate website and admin platform for Taigra Nexus Labs, serving as the public-facing showcase of our capabilities, project portfolio, blog, services, and internal management tools.

---

## 🛠️ Tech Stack

| Layer        | Technology                                                                          |
| ------------ | ----------------------------------------------------------------------------------- |
| **Frontend** | React 19, Vite 6, React Router 7, Framer Motion, Tailwind CSS (CDN)                |
| **Backend**  | Node.js, Express 4                                                                  |
| **Database** | Supabase (PostgreSQL)                                                               |
| **Icons**    | Lucide React, Font Awesome                                                          |
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

## ✨ Features

### Public Website
- 🏠 **Home** — Hero section, TGO heritage showcase, featured projects
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
- 🚀 **Loading Screen** — Branded splash with minimum display time
- ✨ **Framer Motion Animations** — Smooth page transitions and scroll reveals
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
   git clone https://github.com/Taigours-Group/Taigra-Nexus-Lab.git
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
│   ├── CookieConsent.jsx    # GDPR cookie banner
│   ├── Layout.jsx           # Main layout (header, footer, nav)
│   ├── LoadingScreen.jsx    # Branded splash screen
│   ├── PageHero.jsx         # Reusable page hero section
│   └── Tutorial.jsx         # Interactive onboarding walkthrough
├── pages/                   # Route-level page components
│   ├── Admin/               # Admin login & dashboard
│   ├── About.jsx
│   ├── Blogs.jsx
│   ├── Contact.jsx
│   ├── Home.jsx
│   ├── Projects.jsx
│   └── Services.jsx
├── services/                # Data access layer
│   └── dbService.js         # API client for Express backend
├── utils/                   # Utility modules
│   └── cookieConsent.js     # Cookie consent logic
├── public/                  # Static assets & legal pages
│   ├── privacy-policy.html
│   ├── terms-of-service.html
│   ├── sitemap.xml
│   └── robot.txt
├── App.jsx                  # Root component with routing
├── index.jsx                # React entry point
├── index.html               # HTML shell
├── index.css                # Global styles
├── constants.js             # Brand constants & config
├── types.js                 # Shared type definitions
├── server.js                # Express API + Supabase integration
├── vite.config.js           # Vite configuration
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

**Taigra Nexus Labs Pvt. Ltd.**
Pidari, Janakpurdham, Dhanusha District
Madhesh Province, Nepal

📧 Reach us through the [Contact Page](https://taigranexuslabs.onrender.com/#/contact)
🕐 Sunday – Friday · 10:00 AM – 6:00 PM

---

<div align="center">

  **Built with ❤️ by [Taigra Nexus Labs](https://taigranexuslabs.onrender.com) — A TGO Company**

  *© 2026 Taigra Nexus Labs Pvt. Ltd. All rights reserved.*

</div>

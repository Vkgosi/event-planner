# ◈ Evently — Personal Event Planner

A full-featured personal event planner built with **React + Vite**, using the **Context API** for state management. Schedule, view, edit, and delete personal or professional events from a clean, responsive dashboard.

---

## ✨ Features

- **Authentication** — Register with name, email, username & password; log in/out securely (all in-memory, no backend required)
- **Dashboard** — View upcoming and past events at a glance with live countdowns
- **Event Management** — Create, read, update, and delete events with full validation
- **Categories** — Tag events as Work, Personal, Health, Social, or Other
- **Responsive Design** — Works seamlessly on desktop, tablet, and mobile
- **Fixed Header** — Navigation always accessible; collapses to hamburger on mobile
- **Help Centre** — Accordion-based FAQ covering all app features

---

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| [React 18](https://react.dev/) | UI library |
| [Vite 5](https://vitejs.dev/) | Build tool & dev server |
| [React Router v6](https://reactrouter.com/) | Client-side routing |
| Context API | Global state (auth + events) |
| CSS Modules (plain CSS) | Scoped component styling |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Installation & Running

```bash
# 1. Clone the repository
git clone https://github.com/vkgosi/event-planner.git
cd event-planner

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Other Commands

```bash
npm run build    # Production build → dist/
npm run preview  # Preview the production build locally
```

---

## 📁 Project Structure

```
event-planner/
├── index.html                  # App entry HTML
├── vite.config.js              # Vite configuration
├── package.json
├── README.md
└── src/
    ├── main.jsx                # React entry point
    ├── App.jsx                 # Router + layout root
    ├── context/
    │   └── AppContext.jsx      # Context API — auth & event state
    ├── components/
    │   ├── Header.jsx          # Fixed navigation header
    │   ├── Header.css
    │   ├── EventCard.jsx       # Individual event display card
    │   ├── EventCard.css
    │   ├── EventForm.jsx       # Reusable add/edit form
    │   ├── EventForm.css
    │   └── ProtectedRoute.jsx  # Auth guard for private routes
    ├── pages/
    │   ├── LandingPage.jsx     # Public home page
    │   ├── LandingPage.css
    │   ├── LoginPage.jsx       # Login form
    │   ├── RegisterPage.jsx    # Registration form
    │   ├── AuthPages.css       # Shared auth page styles
    │   ├── DashboardPage.jsx   # Main event dashboard
    │   ├── DashboardPage.css
    │   ├── AddEventPage.jsx    # Create new event
    │   ├── EditEventPage.jsx   # Edit existing event
    │   ├── FormPage.css        # Shared form page styles
    │   ├── HelpPage.jsx        # Help & FAQ accordion
    │   └── HelpPage.css
    └── styles/
        └── global.css          # Design system & global styles
```

---

## 🔐 How Authentication Works

This app uses **in-memory state** (React Context) — no backend or localStorage. This means:

- Accounts and events reset on page refresh (by design for this capstone)
- All data lives in the `AppProvider` context
- `ProtectedRoute` guards dashboard/event pages and redirects unauthenticated users to `/login`

---

## 📸 Demo Flow

1. Visit `/` → click **Get started**
2. Register an account (any name/email/username/password)
3. You'll be redirected to `/login` — log in with your new credentials
4. The dashboard loads with **3 seeded demo events**
5. Expand any event card (▼) to edit or delete it
6. Click **Add Event** to schedule your own
7. Visit **Help** for a full usage guide

---

## 📋 Validation Rules

| Field | Rule |
|-------|------|
| Name | Required |
| Email | Required, valid format (`x@x.x`) |
| Username | Required, ≥ 3 characters |
| Password | Required, ≥ 6 characters |
| Event Name | Required |
| Event Date | Required |
| Event Time | Required |

---

## 🎨 Design System

The app uses a custom CSS design system defined in `src/styles/global.css`:

- **Palette:** Deep midnight (`#0d0d14`) + warm ivory (`#f5f0e8`) + amber gold (`#c8963c`)
- **Fonts:** [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) (headings) + [DM Sans](https://fonts.google.com/specimen/DM+Sans) (body)
- **Theming:** CSS custom properties (`--var`) throughout for easy customisation

---

## 📄 Licence

MIT — free to use and modify.

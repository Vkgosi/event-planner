import { useState } from 'react';
import './HelpPage.css';

/** FAQ / help sections content */
const SECTIONS = [
  {
    id: 'getting-started',
    icon: '🚀',
    title: 'Getting Started',
    items: [
      {
        q: 'How do I create an account?',
        a: `Click "Sign up" in the top right corner (or "Get started" on the home page). Fill in your full name, a valid email address, a username (at least 3 characters), and a password (at least 6 characters). All fields are required. Once submitted, you'll be redirected to the login page.`,
      },
      {
        q: 'How do I log in?',
        a: `Navigate to the Login page and enter either your email address or username along with your password. If your credentials are correct you'll be taken straight to your Dashboard.`,
      },
      {
        q: 'How do I log out?',
        a: `Click the "Sign out" button in the top-right corner of the header. On mobile, open the hamburger menu (☰) and tap "Sign out" at the bottom.`,
      },
    ],
  },
  {
    id: 'events',
    icon: '📅',
    title: 'Managing Events',
    items: [
      {
        q: 'How do I add a new event?',
        a: `Click "Add Event" in the navigation bar, or the "+ Add Event" button on your Dashboard. Fill in the event name (required), date (required), time (required), and optionally a category, location, and description. Click "Add Event" to save.`,
      },
      {
        q: 'How do I edit an event?',
        a: `On your Dashboard, click the ▼ arrow on any event card to expand it. Then click "✏️ Edit". You'll be taken to the Edit Event page where you can update any field and click "Save Changes".`,
      },
      {
        q: 'How do I delete an event?',
        a: `Expand the event card (▼) and click "🗑 Delete". For safety, you'll need to click "⚠️ Confirm delete" to permanently remove the event. The button resets after 3 seconds if you change your mind.`,
      },
      {
        q: 'What event categories are available?',
        a: `Events can be tagged as: Work, Personal, Health, Social, or Other. Categories are colour-coded on the dashboard to make it easy to scan your schedule at a glance.`,
      },
    ],
  },
  {
    id: 'dashboard',
    icon: '🗂️',
    title: 'Using the Dashboard',
    items: [
      {
        q: 'How are events organised on the dashboard?',
        a: `Your Dashboard shows two sections: "Upcoming Events" — sorted by nearest date first — and "Past Events" (collapsed by default). Each event card shows the category, a countdown ("Today", "Tomorrow", "In N days"), the event name, date, time, and location.`,
      },
      {
        q: 'What do the stats chips mean?',
        a: `The three chips at the top of the dashboard show: the total number of upcoming events, the number of past events, and how many events are scheduled for today.`,
      },
      {
        q: 'How do I see event details?',
        a: `Click the ▼ arrow on any event card to expand it and reveal the full description and action buttons (Edit / Delete).`,
      },
    ],
  },
  {
    id: 'tips',
    icon: '💡',
    title: 'Tips for Staying Organised',
    items: [
      {
        q: 'Use categories consistently',
        a: `Assigning the right category to every event makes your dashboard easier to scan. Work events in blue, Personal in gold, Health in green — you'll spot patterns at a glance.`,
      },
      {
        q: 'Add a location even for virtual meetings',
        a: `For video calls, paste the Zoom / Teams link into the Location field. When you expand the event card you'll have it right there.`,
      },
      {
        q: 'Write useful descriptions',
        a: `Use the Description field for agenda items, prep reminders, or contacts to call. The card stays tidy — descriptions only appear when you expand the card.`,
      },
      {
        q: 'Check "Today" events first thing',
        a: `The "Today" stat chip on the dashboard tells you at a glance how many things are on your plate. Events labelled "Today" are highlighted in gold so they stand out.`,
      },
    ],
  },
  {
    id: 'navigation',
    icon: '🧭',
    title: 'Navigation',
    items: [
      {
        q: 'What pages are in the app?',
        a: `Dashboard — your event hub. Add Event — schedule something new. Help — this page. The header is fixed so navigation is always one click away.`,
      },
      {
        q: 'How does mobile navigation work?',
        a: `On small screens the nav links are hidden. Tap the ☰ hamburger icon in the top-right to open a full-screen menu with all links and a sign-out button.`,
      },
    ],
  },
];

/**
 * Expandable accordion item inside a help section.
 */
function AccordionItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`help-accordion__item ${open ? 'help-accordion__item--open' : ''}`}>
      <button
        className="help-accordion__trigger"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span>{q}</span>
        <span className="help-accordion__chevron" aria-hidden="true">
          {open ? '▲' : '▼'}
        </span>
      </button>
      {open && (
        <p className="help-accordion__body animate-fade">{a}</p>
      )}
    </div>
  );
}

/**
 * The Help page — provides guidance on all app features.
 */
export default function HelpPage() {
  return (
    <main className="help-page page-wrapper">
      <div className="container">
        {/* Hero */}
        <header className="help-page__header animate-up">
          <h1 className="help-page__title">Help Centre</h1>
          <p className="help-page__sub">
            Everything you need to get the most out of Evently.
          </p>
        </header>

        {/* Quick links */}
        <nav
          className="help-page__quick-links animate-up"
          style={{ animationDelay: '0.05s' }}
          aria-label="Jump to section"
        >
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="help-quick-link"
            >
              <span>{section.icon}</span>
              <span>{section.title}</span>
            </a>
          ))}
        </nav>

        {/* Sections */}
        <div className="help-page__sections">
          {SECTIONS.map((section, i) => (
            <section
              key={section.id}
              id={section.id}
              className="help-section animate-up"
              style={{ animationDelay: `${0.1 + i * 0.06}s` }}
              aria-labelledby={`help-section-${section.id}`}
            >
              <div className="help-section__header">
                <span className="help-section__icon">{section.icon}</span>
                <h2
                  className="help-section__title"
                  id={`help-section-${section.id}`}
                >
                  {section.title}
                </h2>
              </div>

              <div className="help-accordion">
                {section.items.map((item) => (
                  <AccordionItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Contact footer */}
        <div className="help-page__footer animate-up card">
          <span style={{ fontSize: '1.6rem' }}>💬</span>
          <div>
            <h3>Still have questions?</h3>
            <p>
              This is a demo app built as a capstone project. For feature requests
              or bug reports, open an issue on the project's GitHub repository.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

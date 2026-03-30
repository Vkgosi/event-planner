import { Link } from 'react-router-dom';
import './LandingPage.css';

/** Features displayed on the landing page. */
const FEATURES = [
  {
    icon: '📅',
    title: 'Schedule Anything',
    desc: 'Meetings, appointments, social events — all in one place.',
  },
  {
    icon: '✏️',
    title: 'Edit on the Fly',
    desc: 'Update or cancel events instantly. Your dashboard stays in sync.',
  },
  {
    icon: '🗂️',
    title: 'Stay Organised',
   desc: "Categorise events and see what's coming up at a glance.",
  },
];

/**
 * Public landing page shown to unauthenticated visitors.
 */
export default function LandingPage() {
  return (
    <main className="landing page-wrapper">
      {/* Hero */}
      <section className="landing__hero container">
        <div className="landing__hero-content animate-up">
          <p className="landing__eyebrow gold-text">Your personal event planner</p>
          <h1 className="landing__headline">
            Plan every moment,<br />
            <em>effortlessly.</em>
          </h1>
          <p className="landing__subtitle">
            Evently keeps your schedule beautifully organised — whether it's a
            quick call or a month-long project.
          </p>
          <div className="landing__cta">
            <Link to="/register" className="btn btn-primary btn-lg">
              Get started — it's free
            </Link>
            <Link to="/login" className="btn btn-secondary btn-lg">
              Log in
            </Link>
          </div>
        </div>

        {/* Decorative preview card */}
        <div className="landing__preview animate-up" style={{ animationDelay: '0.15s' }}>
          <div className="preview-card">
            <div className="preview-card__header">
              <span className="preview-card__dot" style={{ background: '#e05a5a' }} />
              <span className="preview-card__dot" style={{ background: '#c8963c' }} />
              <span className="preview-card__dot" style={{ background: '#4caf82' }} />
              <span className="preview-card__title">Upcoming Events</span>
            </div>
            {[
              { name: 'Team Standup', time: '09:00', cat: 'Work', color: '#5a8fe0' },
              { name: "Mom's Birthday", time: '19:00', cat: 'Personal', color: '#c8963c' },
              { name: 'Dentist', time: '11:30', cat: 'Health', color: '#4caf82' },
            ].map((item) => (
              <div key={item.name} className="preview-event">
                <span
                  className="preview-event__dot"
                  style={{ background: item.color }}
                />
                <div className="preview-event__info">
                  <span className="preview-event__name">{item.name}</span>
                  <span className="preview-event__time">{item.time}</span>
                </div>
                <span
                  className="preview-event__badge"
                  style={{ color: item.color, background: `${item.color}18` }}
                >
                  {item.cat}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="landing__features container">
        <h2 className="landing__section-title">Everything you need</h2>
        <div className="landing__features-grid">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="feature-card animate-up"
              style={{ animationDelay: `${0.1 + i * 0.08}s` }}
            >
              <span className="feature-card__icon">{f.icon}</span>
              <h3 className="feature-card__title">{f.title}</h3>
              <p className="feature-card__desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="landing__banner">
        <div className="container">
          <h2 className="landing__banner-title">Ready to take control of your time?</h2>
          <Link to="/register" className="btn btn-primary btn-lg">
            Create your free account
          </Link>
        </div>
      </section>
    </main>
  );
}

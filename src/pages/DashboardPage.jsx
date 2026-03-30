import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import EventCard from '../components/EventCard';
import './DashboardPage.css';

/**
 * Main dashboard. Displays upcoming events prominently and past events below.
 * Uses array.map() to generate all event displays dynamically.
 */
export default function DashboardPage() {
  const { currentUser, upcomingEvents, pastEvents } = useApp();
  const [showPast, setShowPast] = useState(false);

  const firstName = currentUser?.name?.split(' ')[0] || 'there';
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <main className="dashboard page-wrapper">
      <div className="container">
        {/* Welcome header */}
        <header className="dashboard__header animate-up">
          <div>
            <p className="dashboard__greeting">{greeting},</p>
            <h1 className="dashboard__name">{firstName} ✦</h1>
          </div>
          <Link to="/add-event" className="btn btn-primary">
            + Add Event
          </Link>
        </header>

        {/* Stats row */}
        <div className="dashboard__stats animate-up" style={{ animationDelay: '0.05s' }}>
          <div className="stat-chip">
            <span className="stat-chip__value">{upcomingEvents.length}</span>
            <span className="stat-chip__label">Upcoming</span>
          </div>
          <div className="stat-chip">
            <span className="stat-chip__value">{pastEvents.length}</span>
            <span className="stat-chip__label">Past</span>
          </div>
          <div className="stat-chip">
            <span className="stat-chip__value">
              {upcomingEvents.filter((e) => {
                const d = new Date(`${e.date}T${e.time}`);
                const now = new Date();
                return (
                  d.getDate() === now.getDate() &&
                  d.getMonth() === now.getMonth() &&
                  d.getFullYear() === now.getFullYear()
                );
              }).length}
            </span>
            <span className="stat-chip__label">Today</span>
          </div>
        </div>

        {/* Upcoming events */}
        <section
          className="dashboard__section animate-up"
          style={{ animationDelay: '0.1s' }}
          aria-labelledby="upcoming-heading"
        >
          <h2 className="dashboard__section-title" id="upcoming-heading">
            Upcoming Events
          </h2>

          {upcomingEvents.length === 0 ? (
            <div className="dashboard__empty">
              <span className="dashboard__empty-icon">🗓️</span>
              <p>No upcoming events yet.</p>
              <Link to="/add-event" className="btn btn-primary btn-sm">
                Schedule your first event
              </Link>
            </div>
          ) : (
            <div className="dashboard__events-grid">
              {/* array.map() dynamically renders each event card */}
              {upcomingEvents.map((event, index) => (
                <EventCard
                  key={event.id}
                  event={event}
                  style={{ animationDelay: `${0.12 + index * 0.06}s` }}
                />
              ))}
            </div>
          )}
        </section>

        {/* Past events (collapsible) */}
        {pastEvents.length > 0 && (
          <section
            className="dashboard__section animate-up"
            style={{ animationDelay: '0.2s' }}
            aria-labelledby="past-heading"
          >
            <button
              className="dashboard__section-toggle"
              onClick={() => setShowPast((s) => !s)}
              aria-expanded={showPast}
              id="past-heading"
            >
              <h2 className="dashboard__section-title">
                Past Events ({pastEvents.length})
              </h2>
              <span className="dashboard__toggle-icon">
                {showPast ? '▲' : '▼'}
              </span>
            </button>

            {showPast && (
              <div className="dashboard__events-grid animate-fade">
                {pastEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}

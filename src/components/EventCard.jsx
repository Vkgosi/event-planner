import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './EventCard.css';

/** Maps category values to display labels and colours. */
const CATEGORY_META = {
  work:     { label: 'Work',     color: '#5a8fe0' },
  personal: { label: 'Personal', color: '#c8963c' },
  health:   { label: 'Health',   color: '#4caf82' },
  social:   { label: 'Social',   color: '#b45ae0' },
  other:    { label: 'Other',    color: '#888' },
};

/**
 * Formats a date string (YYYY-MM-DD) to a readable form.
 * @param {string} dateStr
 * @returns {string}
 */
function formatDate(dateStr) {
  const date = new Date(`${dateStr}T00:00:00`);
  return date.toLocaleDateString('en-ZA', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Formats a time string (HH:MM) to 12-hour format.
 * @param {string} timeStr
 * @returns {string}
 */
function formatTime(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return `${hour}:${m.toString().padStart(2, '0')} ${period}`;
}

/**
 * Computes days until the event.
 * @param {string} dateStr
 * @param {string} timeStr
 * @returns {string}
 */
function daysUntil(dateStr, timeStr) {
  const now = new Date();
  const evt = new Date(`${dateStr}T${timeStr}`);
  const diff = evt - now;
  if (diff < 0) return 'Past';
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Tomorrow';
  return `In ${days} days`;
}

/**
 * Individual event card with expand, edit, and delete controls.
 * @param {{ event: object, style?: object }} props
 */
export default function EventCard({ event, style }) {
  const { deleteEvent } = useApp();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const meta = CATEGORY_META[event.category] || CATEGORY_META.other;
  const countdown = daysUntil(event.date, event.time);
  const isPast = countdown === 'Past';

  const handleDelete = () => {
    if (confirmDelete) {
      deleteEvent(event.id);
    } else {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
    }
  };

  return (
    <article
      className={`event-card ${isPast ? 'event-card--past' : ''} ${expanded ? 'event-card--expanded' : ''}`}
      style={style}
    >
      {/* Category stripe */}
      <div
        className="event-card__stripe"
        style={{ background: meta.color }}
        aria-hidden="true"
      />

      <div className="event-card__body">
        {/* Header row */}
        <div className="event-card__top">
          <div className="event-card__meta">
            <span
              className="badge event-card__category"
              style={{ color: meta.color, background: `${meta.color}18` }}
            >
              {meta.label}
            </span>
            <span className={`event-card__countdown ${countdown === 'Today' ? 'event-card__countdown--today' : ''}`}>
              {countdown}
            </span>
          </div>

          <button
            className="event-card__expand-btn"
            onClick={() => setExpanded((e) => !e)}
            aria-expanded={expanded}
            aria-label={expanded ? 'Collapse event details' : 'Expand event details'}
          >
            {expanded ? '▲' : '▼'}
          </button>
        </div>

        {/* Event name */}
        <h3 className="event-card__name">{event.name}</h3>

        {/* Date / time / location */}
        <div className="event-card__info">
          <span className="event-card__info-item">
            <span className="event-card__info-icon">📅</span>
            {formatDate(event.date)}
          </span>
          <span className="event-card__info-item">
            <span className="event-card__info-icon">⏰</span>
            {formatTime(event.time)}
          </span>
          {event.location && (
            <span className="event-card__info-item">
              <span className="event-card__info-icon">📍</span>
              {event.location}
            </span>
          )}
        </div>

        {/* Expanded description */}
        {expanded && event.description && (
          <p className="event-card__description animate-fade">
            {event.description}
          </p>
        )}

        {/* Actions */}
        {expanded && (
          <div className="event-card__actions animate-fade">
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigate(`/edit-event/${event.id}`)}
            >
              ✏️ Edit
            </button>
            <button
              className={`btn btn-sm ${confirmDelete ? 'btn-danger' : 'btn-danger'}`}
              onClick={handleDelete}
              title={confirmDelete ? 'Click again to confirm' : 'Delete event'}
            >
              {confirmDelete ? '⚠️ Confirm delete' : '🗑 Delete'}
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

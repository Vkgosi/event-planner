import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import EventForm from '../components/EventForm';
import './FormPage.css';

/**
 * Page for editing an existing event.
 * Reads the event ID from the URL params.
 */
export default function EditEventPage() {
  const { id } = useParams();
  const { events, updateEvent } = useApp();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <main className="form-page page-wrapper">
        <div className="container">
          <div className="form-page__inner animate-up">
            <div className="form-page__not-found">
              <span className="form-page__not-found-icon">🔍</span>
              <h2>Event not found</h2>
              <p>This event may have been deleted.</p>
              <Link to="/dashboard" className="btn btn-primary btn-sm">
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /**
   * Handles form submission: updates the event and redirects to dashboard.
   * @param {object} formValues
   */
  const handleSubmit = (formValues) => {
    setLoading(true);
    updateEvent(id, formValues);

    setTimeout(() => {
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 900);
    }, 400);
  };

  return (
    <main className="form-page page-wrapper">
      <div className="container">
        <div className="form-page__inner animate-up">
          <Link to="/dashboard" className="form-page__back">
            ← Back to Dashboard
          </Link>

          <div className="form-page__header">
            <h1 className="form-page__title">Edit event</h1>
            <p className="form-page__sub">Update the details for this event.</p>
          </div>

          {success ? (
            <div className="form-page__success animate-fade">
              <span className="form-page__success-icon">✓</span>
              <p>Event updated! Redirecting to dashboard…</p>
            </div>
          ) : (
            <div className="form-page__card card">
              <EventForm
                initialValues={event}
                onSubmit={handleSubmit}
                submitLabel="Save Changes"
                loading={loading}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import EventForm from '../components/EventForm';
import './FormPage.css';

/**
 * Page for creating a new event.
 */
export default function AddEventPage() {
  const { addEvent } = useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  /**
   * Handles form submission: adds the event and redirects to dashboard.
   * @param {object} formValues
   */
  const handleSubmit = (formValues) => {
    setLoading(true);
    addEvent(formValues);

    // Brief loading state for UX feedback, then redirect
    setTimeout(() => {
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 900);
    }, 400);
  };

  return (
    <main className="form-page page-wrapper">
      <div className="container">
        <div className="form-page__inner animate-up">
          {/* Back link */}
          <Link to="/dashboard" className="form-page__back">
            ← Back to Dashboard
          </Link>

          <div className="form-page__header">
            <h1 className="form-page__title">Add a new event</h1>
            <p className="form-page__sub">
              Fill in the details below to schedule your event.
            </p>
          </div>

          {success ? (
            <div className="form-page__success animate-fade">
              <span className="form-page__success-icon">✓</span>
              <p>Event added! Redirecting to dashboard…</p>
            </div>
          ) : (
            <div className="form-page__card card">
              <EventForm
                onSubmit={handleSubmit}
                submitLabel="Add Event"
                loading={loading}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

import { useState } from 'react';
import './EventForm.css';

const CATEGORIES = [
  { value: 'work',     label: 'Work' },
  { value: 'personal', label: 'Personal' },
  { value: 'health',   label: 'Health' },
  { value: 'social',   label: 'Social' },
  { value: 'other',    label: 'Other' },
];

const EMPTY_FORM = {
  name: '',
  date: '',
  time: '',
  location: '',
  description: '',
  category: 'personal',
};

/**
 * Reusable form for creating and editing events.
 *
 * @param {{
 *   initialValues?: object,
 *   onSubmit: (values: object) => void,
 *   submitLabel?: string,
 *   loading?: boolean,
 * }} props
 */
export default function EventForm({
  initialValues = {},
  onSubmit,
  submitLabel = 'Save Event',
  loading = false,
}) {
  const [values, setValues] = useState({ ...EMPTY_FORM, ...initialValues });
  const [errors, setErrors] = useState({});

  /**
   * Updates a single form field value.
   * @param {string} field
   * @param {string} value
   */
  const handleChange = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  /**
   * Validates form fields. Returns true if valid.
   * @returns {boolean}
   */
  const validate = () => {
    const newErrors = {};

    if (!values.name.trim()) {
      newErrors.name = 'Event name is required.';
    }
    if (!values.date) {
      newErrors.date = 'Date is required.';
    }
    if (!values.time) {
      newErrors.time = 'Time is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(values);
    }
  };

  return (
    <form className="event-form" onSubmit={handleSubmit} noValidate>
      {/* Event name */}
      <div className="form-group">
        <label className="form-label" htmlFor="evt-name">Event Name *</label>
        <input
          id="evt-name"
          type="text"
          className={`form-input ${errors.name ? 'error' : ''}`}
          placeholder="e.g. Team standup, Doctor's appointment…"
          value={values.name}
          onChange={(e) => handleChange('name', e.target.value)}
          maxLength={80}
          autoFocus
        />
        {errors.name && <p className="error-text">⚠ {errors.name}</p>}
      </div>

      {/* Date & time row */}
      <div className="event-form__row">
        <div className="form-group">
          <label className="form-label" htmlFor="evt-date">Date *</label>
          <input
            id="evt-date"
            type="date"
            className={`form-input ${errors.date ? 'error' : ''}`}
            value={values.date}
            onChange={(e) => handleChange('date', e.target.value)}
          />
          {errors.date && <p className="error-text">⚠ {errors.date}</p>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="evt-time">Time *</label>
          <input
            id="evt-time"
            type="time"
            className={`form-input ${errors.time ? 'error' : ''}`}
            value={values.time}
            onChange={(e) => handleChange('time', e.target.value)}
          />
          {errors.time && <p className="error-text">⚠ {errors.time}</p>}
        </div>
      </div>

      {/* Category */}
      <div className="form-group">
        <label className="form-label" htmlFor="evt-category">Category</label>
        <select
          id="evt-category"
          className="form-input"
          value={values.category}
          onChange={(e) => handleChange('category', e.target.value)}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Location */}
      <div className="form-group">
        <label className="form-label" htmlFor="evt-location">Location</label>
        <input
          id="evt-location"
          type="text"
          className="form-input"
          placeholder="e.g. Zoom, 12 Oak Street, Coffee shop…"
          value={values.location}
          onChange={(e) => handleChange('location', e.target.value)}
          maxLength={120}
        />
      </div>

      {/* Description */}
      <div className="form-group">
        <label className="form-label" htmlFor="evt-description">Description</label>
        <textarea
          id="evt-description"
          className="form-input event-form__textarea"
          placeholder="Add any notes or details about this event…"
          value={values.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={4}
          maxLength={500}
        />
        <span className="event-form__char-count">
          {values.description.length}/500
        </span>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="btn btn-primary btn-lg event-form__submit"
        disabled={loading}
      >
        {loading ? (
          <span className="event-form__spinner" aria-hidden="true" />
        ) : null}
        {loading ? 'Saving…' : submitLabel}
      </button>
    </form>
  );
}

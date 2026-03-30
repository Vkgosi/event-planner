import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './AuthPages.css';

const EMPTY = { name: '', email: '', username: '', password: '', confirm: '' };

/**
 * Validates a registration form and returns an errors object.
 * @param {object} values
 * @returns {object}
 */
function validateRegister(values) {
  const errors = {};
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!values.name.trim()) errors.name = 'Full name is required.';
  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!emailRe.test(values.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!values.username.trim()) {
    errors.username = 'Username is required.';
  } else if (values.username.length < 3) {
    errors.username = 'Username must be at least 3 characters.';
  }
  if (!values.password) {
    errors.password = 'Password is required.';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters.';
  }
  if (!values.confirm) {
    errors.confirm = 'Please confirm your password.';
  } else if (values.confirm !== values.password) {
    errors.confirm = 'Passwords do not match.';
  }

  return errors;
}

/**
 * User registration page.
 */
export default function RegisterPage() {
  const { register } = useApp();
  const navigate = useNavigate();

  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
    if (serverError) setServerError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fieldErrors = validateRegister(values);

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    const result = register({
      name: values.name.trim(),
      email: values.email.trim().toLowerCase(),
      username: values.username.trim().toLowerCase(),
      password: values.password,
    });

    if (!result.success) {
      setServerError(result.error);
      setLoading(false);
      return;
    }

    navigate('/login?registered=1');
  };

  return (
    <main className="auth-page page-wrapper">
      <div className="auth-container animate-up">
        <div className="auth-header">
          <span className="auth-header__icon">◈</span>
          <h1 className="auth-header__title">Create your account</h1>
          <p className="auth-header__sub">Start planning in seconds.</p>
        </div>

        {serverError && (
          <div className="auth-alert" role="alert">
            ⚠ {serverError}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="reg-name">Full Name *</label>
            <input
              id="reg-name"
              type="text"
              className={`form-input ${errors.name ? 'error' : ''}`}
              placeholder="Jane Doe"
              value={values.name}
              onChange={(e) => handleChange('name', e.target.value)}
              autoFocus
            />
            {errors.name && <p className="error-text">⚠ {errors.name}</p>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="reg-email">Email Address *</label>
            <input
              id="reg-email"
              type="email"
              className={`form-input ${errors.email ? 'error' : ''}`}
              placeholder="jane@example.com"
              value={values.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
            {errors.email && <p className="error-text">⚠ {errors.email}</p>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="reg-username">Username *</label>
            <input
              id="reg-username"
              type="text"
              className={`form-input ${errors.username ? 'error' : ''}`}
              placeholder="janedoe"
              value={values.username}
              onChange={(e) => handleChange('username', e.target.value)}
            />
            {errors.username && <p className="error-text">⚠ {errors.username}</p>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="reg-password">Password *</label>
            <input
              id="reg-password"
              type="password"
              className={`form-input ${errors.password ? 'error' : ''}`}
              placeholder="At least 6 characters"
              value={values.password}
              onChange={(e) => handleChange('password', e.target.value)}
            />
            {errors.password && <p className="error-text">⚠ {errors.password}</p>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="reg-confirm">Confirm Password *</label>
            <input
              id="reg-confirm"
              type="password"
              className={`form-input ${errors.confirm ? 'error' : ''}`}
              placeholder="Repeat your password"
              value={values.confirm}
              onChange={(e) => handleChange('confirm', e.target.value)}
            />
            {errors.confirm && <p className="error-text">⚠ {errors.confirm}</p>}
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg auth-form__submit"
            disabled={loading}
          >
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{' '}
          <Link to="/login" className="auth-switch__link">Log in</Link>
        </p>
      </div>
    </main>
  );
}

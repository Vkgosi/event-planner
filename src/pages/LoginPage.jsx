import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './AuthPages.css';

/**
 * Login page. Reads ?registered=1 to show a success message after signup.
 */
export default function LoginPage() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const justRegistered = searchParams.get('registered') === '1';

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!identifier.trim()) newErrors.identifier = 'Email or username is required.';
    if (!password) newErrors.password = 'Password is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setServerError('');

    const result = login(identifier.trim().toLowerCase(), password);

    if (!result.success) {
      setServerError(result.error);
      setLoading(false);
      return;
    }

    navigate('/dashboard');
  };

  return (
    <main className="auth-page page-wrapper">
      <div className="auth-container animate-up">
        <div className="auth-header">
          <span className="auth-header__icon">◈</span>
          <h1 className="auth-header__title">Welcome back</h1>
          <p className="auth-header__sub">Log in to your Evently account.</p>
        </div>

        {justRegistered && (
          <div className="auth-alert auth-alert--success" role="status">
            ✓ Account created! Log in to get started.
          </div>
        )}

        {serverError && (
          <div className="auth-alert" role="alert">
            ⚠ {serverError}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="login-id">Email or Username *</label>
            <input
              id="login-id"
              type="text"
              className={`form-input ${errors.identifier ? 'error' : ''}`}
              placeholder="jane@example.com or janedoe"
              value={identifier}
              onChange={(e) => {
                setIdentifier(e.target.value);
                if (errors.identifier) setErrors((p) => ({ ...p, identifier: '' }));
                if (serverError) setServerError('');
              }}
              autoFocus
            />
            {errors.identifier && (
              <p className="error-text">⚠ {errors.identifier}</p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="login-pass">Password *</label>
            <input
              id="login-pass"
              type="password"
              className={`form-input ${errors.password ? 'error' : ''}`}
              placeholder="Your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((p) => ({ ...p, password: '' }));
                if (serverError) setServerError('');
              }}
            />
            {errors.password && <p className="error-text">⚠ {errors.password}</p>}
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg auth-form__submit"
            disabled={loading}
          >
            {loading ? 'Logging in…' : 'Log in'}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account?{' '}
          <Link to="/register" className="auth-switch__link">Sign up free</Link>
        </p>
      </div>
    </main>
  );
}

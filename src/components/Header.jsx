import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Header.css';

/**
 * Fixed header with navigation links and user menu.
 * Shown on all pages when user is logged in.
 */
export default function Header() {
  const { isLoggedIn, currentUser, logout } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <div className="header-inner container">
        {/* Brand */}
        <Link to={isLoggedIn ? '/dashboard' : '/'} className="header-brand">
          <span className="brand-icon">◈</span>
          <span className="brand-name">Evently</span>
        </Link>

        {/* Desktop Nav */}
        {isLoggedIn && (
          <nav className="header-nav" aria-label="Main navigation">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'nav-link--active' : ''}`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/add-event"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'nav-link--active' : ''}`
              }
            >
              Add Event
            </NavLink>
            <NavLink
              to="/help"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'nav-link--active' : ''}`
              }
            >
              Help
            </NavLink>
          </nav>
        )}

        {/* Right side */}
        <div className="header-right">
          {isLoggedIn ? (
            <>
              <span className="user-greeting">
                Hi, <strong>{currentUser?.name?.split(' ')[0]}</strong>
              </span>
              <button className="btn btn-secondary btn-sm" onClick={handleLogout}>
                Sign out
              </button>
            </>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="nav-link">Log in</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Sign up</Link>
            </div>
          )}

          {/* Mobile hamburger */}
          {isLoggedIn && (
            <button
              className={`hamburger ${menuOpen ? 'hamburger--open' : ''}`}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          )}
        </div>
      </div>

      {/* Mobile drawer */}
      {isLoggedIn && menuOpen && (
        <nav className="mobile-nav animate-fade" aria-label="Mobile navigation">
          <NavLink to="/dashboard" className="mobile-nav-link" onClick={closeMenu}>
            Dashboard
          </NavLink>
          <NavLink to="/add-event" className="mobile-nav-link" onClick={closeMenu}>
            Add Event
          </NavLink>
          <NavLink to="/help" className="mobile-nav-link" onClick={closeMenu}>
            Help
          </NavLink>
          <hr className="divider" />
          <button className="btn btn-danger btn-sm" onClick={handleLogout}>
            Sign out
          </button>
        </nav>
      )}
    </header>
  );
}

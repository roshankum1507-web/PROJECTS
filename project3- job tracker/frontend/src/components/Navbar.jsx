import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, theme, toggleTheme } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand">
          JobTrack Pro
        </Link>

        <nav className="navbar__actions">
          <button className="button button--ghost theme-toggle" onClick={toggleTheme} type="button">
            {theme === 'light' ? 'Dark mode' : 'Light mode'}
          </button>
          <Link to="/applications/new" className="button button--secondary">
            Add Application
          </Link>
          <div className="navbar__user">
            <span>{user?.name || 'Student'}</span>
            <button className="button button--ghost" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="auth-page">
      <div className="auth-card card">
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <p className="muted">The page you are looking for does not exist.</p>
        <Link to="/" className="button button--primary full-width">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

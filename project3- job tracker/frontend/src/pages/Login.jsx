import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login, authError, setAuthError, theme, toggleTheme } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setAuthError('');

    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card card">
        <div className="auth-card__topbar">
          <p className="eyebrow">Welcome back</p>
          <button className="button button--ghost theme-toggle" onClick={toggleTheme} type="button">
            {theme === 'light' ? 'Dark mode' : 'Light mode'}
          </button>
        </div>
        <h1>Login to your tracker</h1>
        <p className="muted">Track every internship or job application in one place.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            <span>Email</span>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>

          <label>
            <span>Password</span>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </label>

          {(error || authError) && <p className="form-error">{error || authError}</p>}

          <button type="submit" className="button button--primary full-width" disabled={loading}>
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <p className="auth-switch">
          New here? <Link to="/register">Create account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register, authError, setAuthError, theme, toggleTheme } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
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
      await register(formData.name, formData.email, formData.password);
      navigate('/');
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card card">
        <div className="auth-card__topbar">
          <p className="eyebrow">Create account</p>
          <button className="button button--ghost theme-toggle" onClick={toggleTheme} type="button">
            {theme === 'light' ? 'Dark mode' : 'Light mode'}
          </button>
        </div>
        <h1>Start organizing applications</h1>
        <p className="muted">A simple portfolio project that looks and feels like a real product.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            <span>Name</span>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>

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
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

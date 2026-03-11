import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await axios.post('/api/auth/register', form);
      login(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="form-container">
      <div className="card">
        <p className="form-title">CREATE ACCOUNT</p>
        <p style={{ color: 'var(--text-dim)', fontSize: 14, marginBottom: 24 }}>
          Join KickStats and follow your favourite teams and players.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input type="text" value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })} minLength={6} required />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="btn-primary">Create Account</button>
        </form>
        <p style={{ marginTop: 16, fontSize: 13, color: 'var(--text-dim)', textAlign: 'center' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--green)' }}>Log in</Link>
        </p>
      </div>
    </div>
  );
}

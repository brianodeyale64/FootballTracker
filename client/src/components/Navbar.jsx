import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">⚽ KICKSTATS</Link>
      <div className="navbar-links">
        <NavLink to="/teams"   className="nav-link">Teams</NavLink>
        <NavLink to="/players" className="nav-link">Players</NavLink>
        {user ? (
          <>
            <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
            <button onClick={handleLogout} className="nav-btn" style={{ background: '#2a2a3a', color: '#e8e8f0' }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login"    className="nav-link">Login</NavLink>
            <Link    to="/register" className="nav-btn">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

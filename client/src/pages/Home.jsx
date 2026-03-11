import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();
  return (
    <div className="hero">
      <h1>TRACK YOUR FOOTBALL WORLD</h1>
      <p>Follow your favourite players and teams. Stay on top of stats, form, and performance.</p>
      <div className="hero-btns">
        <Link to="/teams"   className="btn-outline">Browse Teams</Link>
        <Link to="/players" className="btn-outline">Browse Players</Link>
        {!user && <Link to="/register" className="btn-green">Get Started</Link>}
        {user  && <Link to="/dashboard" className="btn-green">My Dashboard →</Link>}
      </div>
    </div>
  );
}

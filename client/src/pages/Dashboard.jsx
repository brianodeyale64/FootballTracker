import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const { user } = useAuth();

  useEffect(() => { fetchProfile(); }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get('/api/users/me');
      setProfile(data);
    } catch (err) { console.error(err); }
  };

  if (!profile) return <div className="loading">Loading your dashboard...</div>;

  return (
    <div>
      <div className="page-header">
        <h1>Welcome back, {user.username}</h1>
        <p>Your followed teams and players</p>
      </div>

      {/* Followed Teams */}
      <div className="dashboard-section">
        <p className="section-title">Followed Teams ({profile.followedTeams.length})</p>
        {profile.followedTeams.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: 32 }}>
            <p style={{ color: 'var(--text-dim)' }}>You're not following any teams yet.</p>
            <Link to="/teams" style={{ color: 'var(--green)', fontSize: 14 }}>Browse Teams →</Link>
          </div>
        ) : (
          <div className="grid grid-3">
            {profile.followedTeams.map(team => (
              <div className="card" key={team._id}>
                <h3 style={{ fontSize: 17, fontWeight: 700 }}>{team.name}</h3>
                <p style={{ color: 'var(--text-dim)', fontSize: 13 }}>{team.league}</p>
                <div className="stat-row">
                  <div className="stat">W <span>{team.stats.wins}</span></div>
                  <div className="stat">D <span>{team.stats.draws}</span></div>
                  <div className="stat">L <span>{team.stats.losses}</span></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Followed Players */}
      <div className="dashboard-section">
        <p className="section-title">Followed Players ({profile.followedPlayers.length})</p>
        {profile.followedPlayers.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: 32 }}>
            <p style={{ color: 'var(--text-dim)' }}>You're not following any players yet.</p>
            <Link to="/players" style={{ color: 'var(--green)', fontSize: 14 }}>Browse Players →</Link>
          </div>
        ) : (
          <div className="grid grid-3">
            {profile.followedPlayers.map(player => (
              <div className="card" key={player._id}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700 }}>{player.name}</h3>
                  <span className={`pos pos-${player.position}`}>{player.position}</span>
                </div>
                <div className="stat-row">
                  <div className="stat">⚽ <span>{player.stats.goals}</span></div>
                  <div className="stat">🅰️ <span>{player.stats.assists}</span></div>
                  <div className="stat">Apps <span>{player.stats.appearances}</span></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

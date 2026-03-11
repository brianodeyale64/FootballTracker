import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => fetchTeams(), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchTeams = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/teams?search=${search}`);
      setTeams(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const toggleFollow = async (id) => {
    if (!user) return alert('Log in to follow teams');
    try {
      const { data } = await axios.post(`/api/teams/${id}/follow`);
      setTeams(prev => prev.map(t =>
        t._id === id
          ? { ...t, followers: t.followers + (data.following ? 1 : -1) }
          : t
      ));
    } catch (err) { console.error(err); }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Teams</h1>
        <p>Browse and follow clubs from across Europe's top leagues</p>
      </div>

      <div className="search-bar">
        <input
          placeholder="Search teams..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {loading ? <div className="loading">Loading...</div> : (
        <div className="grid grid-3">
          {teams.map(team => (
            <div className="card" key={team._id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700 }}>{team.name}</h3>
                  <p style={{ color: 'var(--text-dim)', fontSize: 13, marginTop: 2 }}>
                    {team.league} · {team.country}
                  </p>
                </div>
                <span style={{ fontSize: 12, color: 'var(--text-dim)' }}>
                  {team.followers} followers
                </span>
              </div>

              <div className="stat-row">
                <div className="stat">W <span>{team.stats.wins}</span></div>
                <div className="stat">D <span>{team.stats.draws}</span></div>
                <div className="stat">L <span>{team.stats.losses}</span></div>
                <div className="stat">GF <span>{team.stats.goalsFor}</span></div>
                <div className="stat">GA <span>{team.stats.goalsAgainst}</span></div>
              </div>

              <button
                className="follow-btn"
                onClick={() => toggleFollow(team._id)}
              >
                + Follow
              </button>
            </div>
          ))}
          {teams.length === 0 && <div className="empty">No teams found</div>}
        </div>
      )}
    </div>
  );
}

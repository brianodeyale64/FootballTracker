import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const POSITIONS = ['All', 'FWD', 'MID', 'DEF', 'GK'];

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [search, setSearch] = useState('');
  const [position, setPosition] = useState('All');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => fetchPlayers(), 300);
    return () => clearTimeout(timer);
  }, [search, position]);

  const fetchPlayers = async () => {
    setLoading(true);
    try {
      const pos = position === 'All' ? '' : position;
      const { data } = await axios.get(`/api/players?search=${search}&position=${pos}`);
      setPlayers(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const toggleFollow = async (id) => {
    if (!user) return alert('Log in to follow players');
    try {
      await axios.post(`/api/players/${id}/follow`);
      fetchPlayers();
    } catch (err) { console.error(err); }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Players</h1>
        <p>Track stats for the world's best footballers</p>
      </div>

      <div className="search-bar">
        <input
          placeholder="Search players..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {POSITIONS.map(pos => (
          <button
            key={pos}
            className={`filter-btn ${position === pos ? 'active' : ''}`}
            onClick={() => setPosition(pos)}
          >
            {pos}
          </button>
        ))}
      </div>

      {loading ? <div className="loading">Loading...</div> : (
        <div className="grid grid-3">
          {players.map(player => (
            <div className="card" key={player._id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontSize: 17, fontWeight: 700 }}>{player.name}</h3>
                  <p style={{ color: 'var(--text-dim)', fontSize: 13, marginTop: 3 }}>
                    {player.team?.name} · {player.nationality}
                  </p>
                </div>
                <span className={`pos pos-${player.position}`}>{player.position}</span>
              </div>

              <div className="stat-row">
                <div className="stat">Apps <span>{player.stats.appearances}</span></div>
                <div className="stat">⚽ <span>{player.stats.goals}</span></div>
                <div className="stat">🅰️ <span>{player.stats.assists}</span></div>
                <div className="stat">🟨 <span>{player.stats.yellowCards}</span></div>
              </div>

              <button className="follow-btn" onClick={() => toggleFollow(player._id)}>
                + Follow
              </button>
            </div>
          ))}
          {players.length === 0 && <div className="empty">No players found</div>}
        </div>
      )}
    </div>
  );
}

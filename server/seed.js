require('dotenv').config();
const mongoose = require('mongoose');
const Team = require('./models/Team');
const Player = require('./models/Player');

const teams = [
  { name: 'Arsenal', league: 'Premier League', country: 'England', stadium: 'Emirates Stadium', founded: 1886, stats: { wins: 22, draws: 5, losses: 7, goalsFor: 75, goalsAgainst: 40 } },
  { name: 'Manchester City', league: 'Premier League', country: 'England', stadium: 'Etihad Stadium', founded: 1880, stats: { wins: 25, draws: 4, losses: 5, goalsFor: 85, goalsAgainst: 32 } },
  { name: 'Real Madrid', league: 'La Liga', country: 'Spain', stadium: 'Santiago Bernabéu', founded: 1902, stats: { wins: 24, draws: 4, losses: 6, goalsFor: 70, goalsAgainst: 35 } },
  { name: 'Barcelona', league: 'La Liga', country: 'Spain', stadium: 'Spotify Camp Nou', founded: 1899, stats: { wins: 20, draws: 6, losses: 8, goalsFor: 65, goalsAgainst: 42 } },
  { name: 'Bayern Munich', league: 'Bundesliga', country: 'Germany', stadium: 'Allianz Arena', founded: 1900, stats: { wins: 23, draws: 3, losses: 8, goalsFor: 78, goalsAgainst: 38 } },
  { name: 'PSG', league: 'Ligue 1', country: 'France', stadium: 'Parc des Princes', founded: 1970, stats: { wins: 27, draws: 2, losses: 5, goalsFor: 82, goalsAgainst: 28 } },
];

const playerData = [
  { name: 'Bukayo Saka', teamName: 'Arsenal', position: 'FWD', age: 22, nationality: 'English', stats: { appearances: 34, goals: 16, assists: 11, yellowCards: 2 } },
  { name: 'Martin Ødegaard', teamName: 'Arsenal', position: 'MID', age: 25, nationality: 'Norwegian', stats: { appearances: 30, goals: 8, assists: 12, yellowCards: 3 } },
  { name: 'Erling Haaland', teamName: 'Manchester City', position: 'FWD', age: 23, nationality: 'Norwegian', stats: { appearances: 32, goals: 34, assists: 6, yellowCards: 1 } },
  { name: 'Kevin De Bruyne', teamName: 'Manchester City', position: 'MID', age: 32, nationality: 'Belgian', stats: { appearances: 24, goals: 5, assists: 16, yellowCards: 2 } },
  { name: 'Vinícius Jr.', teamName: 'Real Madrid', position: 'FWD', age: 23, nationality: 'Brazilian', stats: { appearances: 33, goals: 21, assists: 9, yellowCards: 4 } },
  { name: 'Jude Bellingham', teamName: 'Real Madrid', position: 'MID', age: 20, nationality: 'English', stats: { appearances: 35, goals: 19, assists: 10, yellowCards: 5 } },
  { name: 'Robert Lewandowski', teamName: 'Barcelona', position: 'FWD', age: 35, nationality: 'Polish', stats: { appearances: 32, goals: 22, assists: 7, yellowCards: 2 } },
  { name: 'Harry Kane', teamName: 'Bayern Munich', position: 'FWD', age: 30, nationality: 'English', stats: { appearances: 34, goals: 30, assists: 8, yellowCards: 1 } },
  { name: 'Kylian Mbappé', teamName: 'PSG', position: 'FWD', age: 25, nationality: 'French', stats: { appearances: 35, goals: 28, assists: 10, yellowCards: 3 } },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  await Team.deleteMany({});
  await Player.deleteMany({});

  const createdTeams = await Team.insertMany(teams);
  console.log(`Seeded ${createdTeams.length} teams`);

  const teamMap = {};
  createdTeams.forEach(t => { teamMap[t.name] = t._id; });

  const players = playerData.map(p => ({
    ...p,
    team: teamMap[p.teamName],
  }));
  delete players.forEach(p => delete p.teamName);

  const createdPlayers = await Player.insertMany(players.map(({ teamName, ...rest }) => rest));
  console.log(`Seeded ${createdPlayers.length} players`);

  mongoose.disconnect();
  console.log('Done!');
}

seed().catch(console.error);

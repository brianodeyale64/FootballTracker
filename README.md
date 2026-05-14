<img width="1280" height="800" alt="Screenshot 2026-05-14 at 22 55 56" src="https://github.com/user-attachments/assets/2000cca7-37cd-4001-9ae0-17e910c26cfa" />
<img width="1280" height="800" alt="Screenshot 2026-05-14 at 22 55 59" src="https://github.com/user-attachments/assets/b26fdaa8-82de-4890-86dd-fe0f06765cca" />
# KickStats – Football Stats Tracker

A full-stack MERN web application where users can browse football teams and players, view stats, and follow their favourites.

## Tech Stack

- **Frontend**: React.js, React Router, Axios, Context API
- **Backend**: Node.js, Express.js, REST API
- **Database**: MongoDB with Mongoose ODM
- **Auth**: JWT (JSON Web Tokens) + bcrypt password hashing

## Features

- User registration and login with JWT authentication
- Browse Premier League, La Liga, Bundesliga, and Ligue 1 teams
- Browse players with position filtering (FWD / MID / DEF / GK)
- Live search for teams and players
- Follow/unfollow teams and players
- Personal dashboard showing all followed teams and players with stats
- Protected routes — dashboard requires login

## Project Structure

```
FootballTracker/
├── server/
│   ├── models/         # Mongoose schemas (User, Team, Player)
│   ├── routes/         # Express route handlers
│   ├── middleware/      # JWT auth middleware
│   ├── seed.js         # Database seeder with sample data
│   └── index.js        # Express app entry point
└── client/
    └── src/
        ├── context/    # React AuthContext (global auth state)
        ├── components/ # Navbar
        └── pages/      # Home, Login, Register, Teams, Players, Dashboard
```

## Getting Started

### 1. MongoDB Setup
Create a free cluster at [mongodb.com/atlas](https://mongodb.com/atlas), get your connection string.

### 2. Server Setup
```bash
cd server
npm install
cp .env.example .env
# Fill in your MONGO_URI and JWT_SECRET in .env
npm run dev
```

### 3. Seed the database
```bash
cd server
node seed.js
```

### 4. Client Setup
```bash
cd client
npm install
npm start
```

App runs at `http://localhost:3000`, API at `http://localhost:5000`.

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | No | Register new user |
| POST | /api/auth/login | No | Login, returns JWT |
| GET | /api/teams | No | List all teams |
| GET | /api/teams/:id | No | Get team by ID |
| POST | /api/teams/:id/follow | Yes | Toggle follow team |
| GET | /api/players | No | List all players |
| GET | /api/players/:id | No | Get player by ID |
| POST | /api/players/:id/follow | Yes | Toggle follow player |
| GET | /api/users/me | Yes | Get current user profile |

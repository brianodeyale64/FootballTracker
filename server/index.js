require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes    = require('./routes/auth');
const userRoutes    = require('./routes/users');
const teamRoutes    = require('./routes/teams');
const playerRoutes  = require('./routes/players');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth',    authRoutes);
app.use('/api/users',   userRoutes);
app.use('/api/teams',   teamRoutes);
app.use('/api/players', playerRoutes);

app.get('/', (req, res) => res.json({ message: 'Football Tracker API running' }));

// Connect to MongoDB then start server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('DB connection error:', err));

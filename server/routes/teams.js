const express = require('express');
const Team = require('../models/Team');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const router = express.Router();

// GET /api/teams — list all teams (supports ?search=)
router.get('/', async (req, res) => {
  try {
    const query = req.query.search
      ? { name: { $regex: req.query.search, $options: 'i' } }
      : {};
    const teams = await Team.find(query).sort({ name: 1 });
    res.json(teams);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// GET /api/teams/:id
router.get('/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate('players');
    if (!team) return res.status(404).json({ message: 'Team not found' });
    res.json(team);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// POST /api/teams/:id/follow — toggle follow
router.post('/:id/follow', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const teamId = req.params.id;
    const isFollowing = user.followedTeams.includes(teamId);

    if (isFollowing) {
      user.followedTeams = user.followedTeams.filter(t => t.toString() !== teamId);
      await Team.findByIdAndUpdate(teamId, { $inc: { followers: -1 } });
    } else {
      user.followedTeams.push(teamId);
      await Team.findByIdAndUpdate(teamId, { $inc: { followers: 1 } });
    }
    await user.save();
    res.json({ following: !isFollowing });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;

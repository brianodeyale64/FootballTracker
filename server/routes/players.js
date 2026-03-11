const express = require('express');
const Player = require('../models/Player');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const router = express.Router();

// GET /api/players — list all (supports ?search= and ?position=)
router.get('/', async (req, res) => {
  try {
    const query = {};
    if (req.query.search)   query.name = { $regex: req.query.search, $options: 'i' };
    if (req.query.position) query.position = req.query.position;
    const players = await Player.find(query).populate('team', 'name').sort({ name: 1 });
    res.json(players);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// GET /api/players/:id
router.get('/:id', async (req, res) => {
  try {
    const player = await Player.findById(req.params.id).populate('team', 'name league');
    if (!player) return res.status(404).json({ message: 'Player not found' });
    res.json(player);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// POST /api/players/:id/follow — toggle follow
router.post('/:id/follow', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const playerId = req.params.id;
    const isFollowing = user.followedPlayers.includes(playerId);

    if (isFollowing) {
      user.followedPlayers = user.followedPlayers.filter(p => p.toString() !== playerId);
      await Player.findByIdAndUpdate(playerId, { $inc: { followers: -1 } });
    } else {
      user.followedPlayers.push(playerId);
      await Player.findByIdAndUpdate(playerId, { $inc: { followers: 1 } });
    }
    await user.save();
    res.json({ following: !isFollowing });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;

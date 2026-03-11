const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name:     { type: String, required: true, unique: true },
  league:   { type: String, required: true },
  country:  { type: String, required: true },
  badge:    { type: String, default: '' }, // URL to badge image
  stadium:  { type: String, default: '' },
  founded:  { type: Number },
  stats: {
    wins:   { type: Number, default: 0 },
    draws:  { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    goalsFor:     { type: Number, default: 0 },
    goalsAgainst: { type: Number, default: 0 },
  },
  followers: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Team', teamSchema);

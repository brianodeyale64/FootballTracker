const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  team:        { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  nationality: { type: String, default: '' },
  position:    { type: String, enum: ['GK','DEF','MID','FWD'], required: true },
  age:         { type: Number },
  photo:       { type: String, default: '' },
  stats: {
    appearances: { type: Number, default: 0 },
    goals:       { type: Number, default: 0 },
    assists:     { type: Number, default: 0 },
    cleanSheets: { type: Number, default: 0 },
    yellowCards: { type: Number, default: 0 },
    redCards:    { type: Number, default: 0 },
  },
  followers: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Player', playerSchema);

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  waterGoal: { type: Number, default: 8 }, // Default 8 cups of water
  stepGoal: { type: Number, default: 10000 }, // Default 10,000 steps
  waterIntake: { type: Number, default: 0 }, // Tracks water intake (in cups)
  stepsWalked: { type: Number, default: 0 }, // Tracks steps walked
  progress: {
    water: { type: Number, default: 0 }, // Tracks daily water progress in %
    steps: { type: Number, default: 0 }, // Tracks daily step progress in %
  },
  waterStreak: { type: Number, default: 0 }, // Water intake streak
  stepsStreak: { type: Number, default: 0 }, // Steps streak
  lastUpdated: { type: Date, default: Date.now }, // Last date of update to track streak reset
  healthReports: [
    {
      date: Date,
      waterIntake: Number,
      stepsWalked: Number,
      waterStreak: Number,
      stepsStreak: Number,
      message: String, // A personalized message if any
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;

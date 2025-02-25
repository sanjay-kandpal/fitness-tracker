const express = require('express');
const User = require('../models/User');

const router = express.Router();

// 1. Setup Daily Goals for the User
router.post('/setup', async (req, res) => {
  const { name, waterGoal, stepGoal } = req.body;

  try {
    const user = new User({
      name,
      waterGoal,
      stepGoal,
    });
    await user.save();
    res.status(201).json({ message: 'User created and goals set', user });
  } catch (err) {
    res.status(500).json({ message: 'Error setting up user goals', error: err.message });
  }
});

// 2. Log Water Intake for the Day
router.post('/log-water', async (req, res) => {
  const { userId, waterAmount } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.waterIntake += waterAmount;
    user.progress.water = (user.waterIntake / user.waterGoal) * 100;
    await user.save();

    res.json({ message: 'Water intake logged', user });
  } catch (err) {
    res.status(500).json({ message: 'Error logging water intake', error: err.message });
  }
});

// 3. Log Steps for the Day
router.post('/log-steps', async (req, res) => {
  const { userId, steps } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.stepsWalked += steps;
    user.progress.steps = (user.stepsWalked / user.stepGoal) * 100;
    await user.save();

    res.json({ message: 'Steps logged', user });
  } catch (err) {
    res.status(500).json({ message: 'Error logging steps', error: err.message });
  }
});

// 4. Get Daily Progress for the User
router.get('/progress/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      message: 'User progress retrieved',
      waterProgress: user.progress.water,
      stepsProgress: user.progress.steps,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving user progress', error: err.message });
  }
});

module.exports = router;

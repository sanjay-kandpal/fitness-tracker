// jobs/cronJobs.js
const cron = require('node-cron');
const User = require('../models/User'); // Path to your User model
const { generateWeeklyReport } = require('../services/reportService'); // Import the generateWeeklyReport service
const { sendEmail } = require('../services/emailService'); // Import the emailService

// Schedule a cron job to send weekly reports every Sunday at 8 PM
cron.schedule('0 20 * * SUN', async () => {
  try {
    // Get all users to send weekly report
    const users = await User.find({});

    // Loop through all users and send the report
    for (const user of users) {
      const report = generateWeeklyReport(user);

      // Send the report via email
      await sendEmail(user.email, 'Your Weekly Fitness Report', report.message);

      // Optionally, store the report in the user’s `healthReports` field (if you want to keep a history)
      user.healthReports.push(report);
      await user.save();
    }
    console.log('Weekly reports sent to all users.');
  } catch (err) {
    console.error('Error sending weekly reports:', err.message);
  }
});

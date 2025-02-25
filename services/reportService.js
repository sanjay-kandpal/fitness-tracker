// services/reportService.js

const generateWeeklyReport = (user) => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - 7); // Get the date 7 days ago
  
    // Filter data from the past week
    const recentLogs = user.activityLogs.filter((log) => {
      const logDate = new Date(log.date);
      return logDate >= startOfWeek && logDate <= today;
    });
  
    // Aggregate data for the report
    const totalWaterIntake = recentLogs.reduce((acc, log) => acc + log.waterIntake, 0);
    const totalSteps = recentLogs.reduce((acc, log) => acc + log.stepsWalked, 0);
    const highestWaterStreak = recentLogs.reduce((acc, log) => Math.max(acc, log.waterStreak), 0);
    const highestStepsStreak = recentLogs.reduce((acc, log) => Math.max(acc, log.stepsStreak), 0);
  
    const reportMessage = `Here's your weekly fitness summary:
  - Total Water Intake: ${totalWaterIntake} cups
  - Total Steps Walked: ${totalSteps} steps
  - Highest Water Streak: ${highestWaterStreak} days
  - Highest Steps Streak: ${highestStepsStreak} days
  Keep up the great work!`;
  
    // Return the health report object
    return {
      date: today,
      waterIntake: totalWaterIntake,
      stepsWalked: totalSteps,
      waterStreak: highestWaterStreak,
      stepsStreak: highestStepsStreak,
      message: reportMessage,
    };
  };
  
  module.exports = {
    generateWeeklyReport,
  };
  
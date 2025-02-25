// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./config/db');
const trackerRoutes = require('./routes/tracker');
const cronJob = require('./jobs/cronJobs'); // Import the cron job to schedule it

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/tracker', trackerRoutes);

// Start the cron jobs
cronJob; // This will start the cron job for sending weekly reports

app.listen(port, () => {
  console.log(`Fitness Tracker API is running on http://localhost:${port}`);
});

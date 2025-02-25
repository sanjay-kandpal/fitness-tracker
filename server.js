const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./config/db'); // Import the DB config
const trackerRoutes = require('./routes/tracker');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/tracker', trackerRoutes);

app.listen(port, () => {
  console.log(`Fitness Tracker API is running on http://localhost:${port}`);
});

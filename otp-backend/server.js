/**
 * @file Server entrypoint for the OTP backend application.
 * Connects to MongoDB and starts the Express HTTP server.
 */
const app = require('./src/app');
const mongoose = require('mongoose');
require('dotenv').config();

/**
 * Connect to MongoDB using the connection URI from environment variables.
 * Starts the Express server once the database connection is established.
 */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
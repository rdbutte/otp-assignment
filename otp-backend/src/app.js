/**
 * @file Express application configuration for the OTP backend.
 */
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({ origin: 'http://localhost:4200' })); // Angular default port
app.use(express.json());

/**
 * @description Mount authentication routes under /api/auth.
 */
app.use('/api/auth', require('./routes/auth.routes'));

module.exports = app;
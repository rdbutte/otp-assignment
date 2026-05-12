/**
 * @file Authentication routes for OTP operations.
 */
const express = require('express');
const router = express.Router();
const { sendOtp, verifyOtp } = require('../controllers/auth.controller');

/**
 * @description Send OTP endpoint.
 * @name POST/api/auth/send-otp
 */
router.post('/send-otp', sendOtp);

/**
 * @description Verify OTP endpoint.
 * @name POST/api/auth/verify-otp
 */
router.post('/verify-otp', verifyOtp);

module.exports = router;
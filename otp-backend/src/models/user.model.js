/**
 * @file Mongoose user model for OTP authentication.
 */
const mongoose = require('mongoose');

/**
 * @description Mongoose schema for a user document.
 * @type {import('mongoose').Schema}
 */
const userSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  otp: String,
  otpExpiry: Date,
  isVerified: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
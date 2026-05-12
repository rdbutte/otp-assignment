/**
 * @file Utility to generate a 6-digit one-time password (OTP).
 */
/**
 * Generate a random 6-digit OTP string.
 * @returns {string} The generated OTP.
 */
module.exports = () => Math.floor(100000 + Math.random() * 900000).toString();
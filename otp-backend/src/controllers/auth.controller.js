/**
 * @file Authentication controller with OTP send and verification handlers.
 */
const generateOtp = require('../utils/generateOtp');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * @description Send an OTP to the provided phone number and store a hashed version in the database.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
exports.sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ message: 'Phone is required' });
    }

    const otp = generateOtp();
    const hashedOtp = await bcrypt.hash(otp, 10);
    const expiry = new Date(Date.now() + 2 * 60 * 1000);

    let user = await User.findOne({ phone });
    if (!user) user = new User({ phone });

    user.otp = hashedOtp;
    user.otpExpiry = expiry;
    user.isVerified = false;

    await user.save();

    console.log('OTP (for testing):', otp);

    res.json({ message: 'OTP sent successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @description Verify the supplied OTP and return a JWT token when successful.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
exports.verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({ message: 'Phone and OTP required' });
    }

    const user = await User.findOne({ phone });
    if (!user) return res.status(400).json({ message: 'User not found' });

    if (!user.otpExpiry || new Date() > user.otpExpiry)
      return res.status(400).json({ message: 'OTP expired' });

    const isMatch = await bcrypt.compare(otp, user.otp);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid OTP' });

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    const token = jwt.sign({ id: user._id, phone: user.phone }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.json({ message: 'Verified successfully', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
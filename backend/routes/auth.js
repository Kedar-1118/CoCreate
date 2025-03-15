const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');

const router = express.Router();

// 📌 **Inline OTP Schema**
const mongoose = require('mongoose');
const otpSchema = new mongoose.Schema({
  email: String,
  otp: String,
  createdAt: { type: Date, default: Date.now, expires: 300 }, // Expires in 5 mins
});
const OTP = mongoose.model('OTP', otpSchema);

// 📩 **Nodemailer Setup**
// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false, // Use true for port 465
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
//   tls: {
//     rejectUnauthorized: false, // Prevents SSL issues
//   },
// });

// transporter.verify((error, success) => {
//   if (error) {
//     console.error("SMTP Error:", error);
//   } else {
//     console.log("SMTP Connection Success!");
//   }
// });


// 🔢 **Generate OTP**
// const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// 📨 **Send OTP Route**
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already registered' });

    const otp = '111111';
    await OTP.findOneAndUpdate({ email }, { otp }, { upsert: true, new: true });

    console.log(`Generated OTP: ${otp}`);



    console.log('OTP sent successfully');
    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);  // Logs the actual error
    res.status(500).json({ message: 'Error sending OTP', error: error.message });
  }
});


// ✅ **Verify OTP & Register Route**
router.post('/verify-otp', async (req, res) => {
  const { name, email, password, otp } = req.body;

  try {
    const storedOTP = await OTP.findOne({ email });
    if (!storedOTP || storedOTP.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email: email.toLowerCase(), password });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });



    res.json({ username: newUser.name, token: token, message: 'Registration successful!' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
    console.log(error);
  }
});

// 📝 **Register Route (Without OTP)**
// router.post('/register', async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     const userExists = await User.findOne({ email });
//     if (userExists) return res.status(400).json({ message: 'User already exists' });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const email = email.toLowerCase();
//     const user = new User({ name, email, password: hashedPassword });
//     await user.save();


//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     res.status(201).json({ username: user.name, token: token });
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// 🔐 **Login Route**
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(400).json({ message: 'Invalid Email' });

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    console.log(user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ username: user.name, token: token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

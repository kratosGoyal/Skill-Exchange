import "dotenv/config";
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import nodemailer from "nodemailer"

const router = express.Router();
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});


router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already exists" });

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const user = new User({ name, email, password: hashedPassword, isVerified: true });
    await user.save();

    res.json({
      message: "Signup successful! You can now log in.",
      user: { name: user.name, email: user.email, isVerified: user.isVerified },
    });
  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(500).json({ error: "Error signing up" });
  }
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({
      message: "Login successful",
      user: { name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Error logging in" });
  }
});

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); 
};

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = generateOTP();
    const otpExpires = Date.now() + (10 * 60 * 1000);

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is ${otp}. It is valid for 10 minutes.`,
    });

    res.json({ message: "OTP sent to your email" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error sending OTP", error });
  }
});


router.post("/verify-otp", async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });

    

    if ( user.otp !== otp || Date.now() > user.otpExpires) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset Successfully",
      text: `Your Password has been reset successfully`,
    });

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error resetting password", error });
  }
});



export default router;

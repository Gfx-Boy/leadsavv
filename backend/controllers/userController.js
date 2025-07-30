import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel.js';
import { sendVerificationEmail } from '../utils/sendVerificationEmail.js';
import crypto from "crypto";
import nodemailer from "nodemailer";

const JWT_SECRET = 'your-hardcoded-secret-key';  // Replace with your actual secret key

// Function to generate a random verification code
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code as a string
};

export const getSubscriptionPlan = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId); // Use req.userId from authentication middleware
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the subscription plan and price
    const subscriptionPlanDetails = {
      subscriptionPlan: user.subscriptionPlan,
      price: getPlanPrice(user.subscriptionPlan), // Helper function to get the price
    };

    res.status(200).json(subscriptionPlanDetails);
  } catch (error) {
    console.error('Error fetching subscription plan:', error.message);
    res.status(500).json({ message: 'Failed to fetch subscription plan.' });
  }
};

// Helper function to get the price of a subscription plan
const getPlanPrice = (plan) => {
  const planPrices = {
    free: 0,
    basic: 19,
    pro: 49,
    premium: 99,
  };
  return planPrices[plan] || 0; // Default to 0 if the plan is not found
};

export const updateLoginDetails = async (req, res) => {
  const { email, firstName, lastName } = req.body;

  try {
    const user = await UserModel.findById(req.userId); // `req.userId` is set by the `authenticateToken` middleware
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the new email is already in use by another user
    if (email && email !== user.email) {
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email is already in use by another account' });
      }
    }

    // Update the user's details
    user.email = email || user.email;
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;

    await user.save();

    res.status(200).json({ message: 'Login details updated successfully' });
  } catch (error) {
    console.error('Error updating login details:', error);
    res.status(500).json({ message: 'An error occurred while updating login details' });
  }
};

export const changePassword = async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  try {
    // Find the user by ID
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the current password is correct
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Check if the new password matches the confirmation password
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'New password and confirmation password do not match' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: 'An error occurred while changing the password' });
  }
};
// Function to signup the user
export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate verification code
    const verificationCode = generateVerificationCode();

    // Create a new user
    const user = new UserModel({ email, password: hashedPassword, verificationCode });
    const savedUser = await user.save();

    // Send verification email
    await sendVerificationEmail(email, verificationCode);

    res.status(201).json({ message: 'User created, please verify your email' });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // Find the user by email
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password has been reset successfully." });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(500).json({ message: "An error occurred while resetting your password." });
  }
};
export const getUserProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId); // `req.userId` is set by the `authenticateToken` middleware
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user's profile data
    res.status(200).json({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'An error occurred while fetching the profile' });
  }
};


export const updateUserProfile = async (req, res) => {
  const { firstName, lastName, purpose } = req.body;

  try {
    const user = await UserModel.findById(req.userId); // req.userId is set by the protect middleware
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's profile
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.purpose = purpose || user.purpose;

    await user.save();

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'An error occurred while updating the profile' });
  }
};
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Generate a 6-digit verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Set the verification code and expiration time
    user.resetPasswordToken = verificationCode;
    user.resetPasswordExpires = Date.now() + 3600000; // Code valid for 1 hour
    await user.save();

    // Send the verification code via email
    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 465,
      auth: {
        user: 'info@solvevare.com',
        pass: '@Solvevare2024',
      },
    });

    const mailOptions = {
      to: user.email,
      from: "info@solvevare.com",
      subject: "Password Reset Verification Code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="text-align: center; color: #007bff;">Password Reset Request</h2>
          <p>Hello,</p>
          <p>You requested to reset your password. Use the following verification code to reset your password:</p>
          <div style="text-align: center; margin: 20px 0;">
            <span style="font-size: 24px; font-weight: bold; color: #007bff;">${verificationCode}</span>
          </div>
          <p>This code is valid for 1 hour. If you did not request this, please ignore this email.</p>
          <p>Thank you,<br>The Solvevare Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Verification code sent to email." });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res.status(500).json({ message: "An error occurred while processing your request." });
  }
};
export const verifyCode = async (req, res) => {
  const { email, verificationCode } = req.body;

  try {
    // Find the user by email and verification code
    const user = await UserModel.findOne({
      email,
      resetPasswordToken: verificationCode,
      resetPasswordExpires: { $gt: Date.now() }, // Ensure the code is not expired
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired verification code." });
    }

    // Clear the verification code after successful verification
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Verification successful. You can now reset your password." });
  } catch (error) {
    console.error("Error in verifyCode:", error);
    res.status(500).json({ message: "An error occurred while verifying the code." });
  }
};

// Function to verify the user's email
export const verifyEmail = async (req, res) => {
  try {
    const { email, verificationCode } = req.body;

    // Log the request body
    console.log('Request body:', req.body);

    // Find the user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or verification code' });
    }

    // Log the stored and provided verification codes
    console.log('Stored verification code:', user.verificationCode);
    console.log('Provided verification code:', verificationCode);

    // Check if the verification code matches
    if (user.verificationCode !== verificationCode) {
      return res.status(400).json({ message: 'Invalid email or verification code' });
    }

    // Check if the user is already verified
    if (user.isVerified) {
      return res.status(400).json({ message: 'User is already verified' });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    // Update the user's verification status
    user.isVerified = true;
    user.verificationCode = null; // Clear the verification code
    await user.save();

    res.json({ message: 'Email verified successfully', token });
  } catch (error) {
    console.error('Email Verification Error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
export const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the user is already verified
    if (user.isVerified) {
      return res.status(400).json({ message: "User is already verified." });
    }

    // Generate a new verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.verificationCode = verificationCode;
    await user.save();

    // Send the verification email
    await sendVerificationEmail(email, verificationCode);

    res.status(200).json({ message: "Verification email sent successfully." });
  } catch (error) {
    console.error("Error in resendVerificationEmail:", error);
    res.status(500).json({ message: "An error occurred while resending the verification email." });
  }
};
// Function to login the user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Log the provided and stored passwords
    console.log('Provided password:', password);
    console.log('Stored hashed password:', user.password);

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if the user is verified
    if (!user.isVerified) {
      return res.status(400).json({ message: 'Please verify your email first' });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
export const deleteAccount = async (req, res) => {
  const { password } = req.body; // Get the password from the request body

  try {
    // Find the user by ID
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Delete the user
    await UserModel.findByIdAndDelete(req.userId);

    // Respond with success
    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({ message: 'An error occurred while deleting the account' });
  }
};
import express from 'express';
import { signup, verifyEmail, login, getSubscriptionPlan, updateUserProfile, getUserProfile, updateLoginDetails,changePassword, forgotPassword, resetPassword, verifyCode, resendVerificationEmail, deleteAccount } from './controllers/userController.js';
import { authenticateToken } from './middleware/auth.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/verify-email', verifyEmail);
router.post('/login', login);
router.put('/users/profile', authenticateToken, updateUserProfile);
router.get('/user/subscription-plan', authenticateToken, getSubscriptionPlan);
router.get('/users/profile', authenticateToken, getUserProfile);
router.put('/users/update-login', authenticateToken, updateLoginDetails);
router.put('/users/change-password', authenticateToken, changePassword);
router.post("/forgot-password", forgotPassword);
router.post("/resend-verification-email", resendVerificationEmail);
router.delete('/delete-account', authenticateToken, deleteAccount);

// Route for verifying the code
router.post("/verify-code", verifyCode);

// Route for resetting the password
router.post("/reset-password", resetPassword);


export default router;

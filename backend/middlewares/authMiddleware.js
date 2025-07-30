import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel.js';

const JWT_SECRET = 'your-hardcoded-secret-key';  // Replace with your actual secret key

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = await UserModel.findById(decoded.userId).select('-password');
      next();
    } catch (error) {
      console.error('Token verification error:', error);
      res.status(403).json({ error: 'Forbidden' });
    }
  } else {
    res.status(401).json({ error: 'Not authorized, no token' });
  }
};
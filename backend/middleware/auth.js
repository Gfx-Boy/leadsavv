import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your-hardcoded-secret-key';  // Replace with your actual secret key

// Middleware to authenticate using JWT
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token is missing or invalid' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.userId = decoded.userId; // Attach the userId to the request object
    next();
  });
};

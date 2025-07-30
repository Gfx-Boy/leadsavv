const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const slotModel = require('../models/slotModel.js');
const appointmentModel = require('../models/appointmentModel.js');

const JWT_SECRET_KEY = 'your-secret-key'; // Replace with your actual secret key

// Middleware to authenticate using JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Forbidden: Invalid token' });
    req.user = user;
    next();
  });
};

// Middleware to log API requests
const logRequests = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
};

// Middleware to validate appointment data
const validateAppointment = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('slot_time').notEmpty().withMessage('Slot time is required'),
  body('slot_date').notEmpty().withMessage('Slot date is required'),
  async (req, res, next) => {
    const { slot_time, slot_date } = req.body;

    try {
      const slotExists = await slotModel.findOne({ slot_time, slot_date });
      if (!slotExists) {
        return res.status(400).json({ message: 'Slot does not exist for the given time and date' });
      }
      req.slot = slotExists; // Attach the slot to the request
      next();
    } catch (err) {
      return res.status(500).json({ message: 'Error validating slot', error: err });
    }
  },
];

// Middleware to validate slot data
const validateSlot = [
  body('slot_time').notEmpty().withMessage('Slot time is required'),
  body('slot_date').notEmpty().withMessage('Slot date is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Middleware to populate slot in appointments
const populateSlot = async (req, res, next) => {
  const { id } = req.params;

  try {
    const appointment = await appointmentModel.findById(id).populate('slots');
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    req.appointment = appointment; // Attach populated appointment to the request
    next();
  } catch (err) {
    return res.status(500).json({ message: 'Error populating slot data', error: err });
  }
};

module.exports = {
  authenticateToken,
  logRequests,
  validateAppointment,
  validateSlot,
  populateSlot,
};

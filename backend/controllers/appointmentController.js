import Appointment from '../models/Appointment.js';

// List all appointments
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.userId });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single appointment by ID
export const getAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOne({ _id: req.params.id, userId: req.userId });
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found.' });
    }
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new appointment
export const createAppointment = async (req, res) => {
  const appointment = new Appointment({
    ...req.body,
    userId: req.userId,
  });

  try {
    const savedAppointment = await appointment.save();
    res.status(201).json(savedAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an existing appointment
export const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found.' });
    }
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove an appointment
export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found.' });
    }
    res.json({ message: 'Appointment removed successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

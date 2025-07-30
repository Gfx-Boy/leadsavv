import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  slotId: { type: mongoose.Schema.Types.ObjectId, ref: 'Slot', required: true },
}, { timestamps: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;

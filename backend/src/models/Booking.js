import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  expertId: { type: mongoose.Schema.Types.ObjectId, ref: 'Expert', required: true },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  userPhone: { type: String, required: true },
  startTime: { type: Date, required: true },
  notes: { type: String },
  status: { 
    type: String, 
    enum: ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'],
    default: 'CONFIRMED'
  },
}, { timestamps: true });

bookingSchema.index({ expertId: 1, startTime: 1 }, { unique: true });

export const Booking = mongoose.model('Booking', bookingSchema);

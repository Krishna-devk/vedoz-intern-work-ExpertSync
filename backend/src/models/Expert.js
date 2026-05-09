import mongoose from 'mongoose';

const slotSchema = new mongoose.Schema({
  startTime: { type: Date, required: true },
  isBooked: { type: Boolean, default: false },
});

const expertSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  rating: { type: Number, default: 0 },
  experience: { type: Number, default: 0 },
  bio: { type: String, required: true },
  avatar: { type: String },
  slots: [slotSchema],
}, { timestamps: true });

export const Expert = mongoose.model('Expert', expertSchema);

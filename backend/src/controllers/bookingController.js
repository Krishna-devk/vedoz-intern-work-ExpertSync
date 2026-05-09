import mongoose from 'mongoose';
import { Booking } from '../models/Booking.js';
import { Expert } from '../models/Expert.js';
import { bookingSchema } from '@expertsync/shared';

export const createBooking = async (req, res, next) => {
  const session = await mongoose.startSession();
  
  try {
    // Validate request body
    const validatedData = bookingSchema.parse(req.body);
    const { expertId, startTime } = validatedData;

    let bookingResult;

    await session.withTransaction(async () => {
      // 1. Atomically find and update the expert's slot
      // We look for the expert AND the specific slot that is NOT booked
      const expert = await Expert.findOneAndUpdate(
        {
          _id: expertId,
          'slots.startTime': new Date(startTime),
          'slots.isBooked': false
        },
        {
          $set: { 'slots.$.isBooked': true }
        },
        { 
          session, 
          new: true 
        }
      );

      if (!expert) {
        throw new Error('Slot is already booked or expert does not exist');
      }

      // 2. Create the booking record
      const [booking] = await Booking.create([validatedData], { session });
      bookingResult = booking;
    });

    // If we are here, transaction was successful
    // Emit socket event to notify other users
    req.io.to(expertId).emit('SLOT_UPDATED', { 
      expertId, 
      startTime, 
      isBooked: true 
    });

    res.status(201).json({
      success: true,
      data: bookingResult
    });

  } catch (error) {
    if (error.name === 'ZodError') {
      res.status(400);
      return next(new Error(error.errors[0].message));
    }
    res.status(409); // Conflict
    next(error);
  } finally {
    session.endSession();
  }
};

export const updateBookingStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!booking) {
      res.status(404);
      throw new Error('Booking not found');
    }

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    next(error);
  }
};

export const getMyBookings = async (req, res, next) => {
  try {
    const { email } = req.query;
    if (!email) {
      res.status(400);
      throw new Error('Email is required');
    }

    const bookings = await Booking.find({ userEmail: email })
      .populate('expertId', 'name category avatar')
      .sort({ startTime: -1 });

    res.status(200).json({
      success: true,
      data: bookings
    });
  } catch (error) {
    next(error);
  }
};

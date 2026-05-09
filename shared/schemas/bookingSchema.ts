import { z } from 'zod';
import { BOOKING_STATUS } from '../constants/bookingStatus';

export const bookingSchema = z.object({
  expertId: z.string(),
  userName: z.string().min(2, 'Name is required'),
  userEmail: z.string().email('Invalid email address'),
  userPhone: z.string().min(10, 'Invalid phone number'),
  startTime: z.string(), // ISO string
  notes: z.string().optional(),
  status: z.enum([
    BOOKING_STATUS.PENDING,
    BOOKING_STATUS.CONFIRMED,
    BOOKING_STATUS.CANCELLED,
    BOOKING_STATUS.COMPLETED
  ]).default(BOOKING_STATUS.CONFIRMED)
});

export type Booking = z.infer<typeof bookingSchema> & { _id: string };

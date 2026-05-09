import express from 'express';
import { createBooking, getMyBookings } from '../controllers/bookingController.js';

const router = express.Router();

router.post('/', createBooking);
router.get('/my', getMyBookings);

export default router;

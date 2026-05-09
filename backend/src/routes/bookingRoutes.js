import express from 'express';
import { createBooking, getMyBookings, updateBookingStatus } from '../controllers/bookingController.js';


const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       required:
 *         - expertId
 *         - userName
 *         - userEmail
 *         - userPhone
 *         - startTime
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the booking
 *         expertId:
 *           type: string
 *           description: The id of the expert
 *         userName:
 *           type: string
 *           description: The name of the user
 *         userEmail:
 *           type: string
 *           description: The email of the user
 *         userPhone:
 *           type: string
 *           description: The phone number of the user
 *         startTime:
 *           type: string
 *           format: date-time
 *         notes:
 *           type: string
 *           description: Optional notes for the booking
 *         status:
 *           type: string
 *           enum: [PENDING, CONFIRMED, CANCELLED, COMPLETED]
 *           default: CONFIRMED
 */

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: The bookings managing API
 */

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       201:
 *         description: The booking was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       500:
 *         description: Some server error
 */
router.post('/', createBooking);

/**
 * @swagger
 * /api/bookings/my:
 *   get:
 *     summary: Returns the list of bookings for the current user
 *     tags: [Bookings]
 *     responses:
 *       200:
 *         description: The list of the bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 */
router.get('/my', getMyBookings);

/**
 * @swagger
 * /api/bookings/{id}/status:
 *   patch:
 *     summary: Update booking status
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [PENDING, CONFIRMED, CANCELLED, COMPLETED]
 *     responses:
 *       200:
 *         description: Status updated successfully
 */
router.patch('/:id/status', updateBookingStatus);


export default router;

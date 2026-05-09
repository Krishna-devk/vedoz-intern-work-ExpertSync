import express from 'express';
import { getExperts, getExpertById, addSlot } from '../controllers/expertController.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Expert:
 *       type: object
 *       required:
 *         - name
 *         - category
 *         - experience
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the expert
 *         name:
 *           type: string
 *           description: The name of the expert
 *         category:
 *           type: string
 *           description: The expert's area of expertise
 *         rating:
 *           type: number
 *           description: Average rating of the expert (0-5)
 *         experience:
 *           type: number
 *           description: Years of experience
 *         bio:
 *           type: string
 *           description: A short biography
 *         avatar:
 *           type: string
 *           description: URL to the expert's avatar
 *         slots:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               startTime:
 *                 type: string
 *                 format: date-time
 *               isBooked:
 *                 type: boolean
 */

/**
 * @swagger
 * tags:
 *   name: Experts
 *   description: The experts managing API
 */

/**
 * @swagger
 * /api/experts:
 *   get:
 *     summary: Returns the list of all the experts
 *     tags: [Experts]
 *     responses:
 *       200:
 *         description: The list of the experts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Expert'
 */
router.get('/', getExperts);

/**
 * @swagger
 * /api/experts/{id}:
 *   get:
 *     summary: Get the expert by id
 *     tags: [Experts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The expert id
 *     responses:
 *       200:
 *         description: The expert description by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expert'
 *       404:
 *         description: The expert was not found
 */
router.get('/:id', getExpertById);

/**
 * @swagger
 * /api/experts/{id}/slots:
 *   post:
 *     summary: Add a new slot for an expert
 *     tags: [Experts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The expert id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startTime:
 *                 type: string
 *                 format: date-time
 *               endTime:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Slot added successfully
 *       400:
 *         description: Invalid input
 */
router.post('/:id/slots', addSlot);

export default router;

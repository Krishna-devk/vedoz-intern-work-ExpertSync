import express from 'express';
import { getExperts, getExpertById, addSlot } from '../controllers/expertController.js';

const router = express.Router();

router.get('/', getExperts);
router.get('/:id', getExpertById);
router.post('/:id/slots', addSlot);

export default router;

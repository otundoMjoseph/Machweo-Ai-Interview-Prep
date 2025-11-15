import express from 'express';
import { generateQuestion, handleAnswer, getHistory } from '../controllers/interviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/question', protect, generateQuestion);
router.post('/answer', protect, handleAnswer);
router.get('/history', protect, getHistory);

export default router;

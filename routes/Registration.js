import express from 'express';
import { registration } from '../controllers/Registration.js';

const router = express.Router();

// User Registration Endpoint
router.post('/', registration);

export default router;
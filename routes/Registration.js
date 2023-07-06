import express from 'express';
import { registration,getuser } from '../controllers/Registration.js';

const router = express.Router();

// User Registration Endpoint
router.post('/', registration);
router.get('/', getuser);

export default router;



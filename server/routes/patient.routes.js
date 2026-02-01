import express from 'express';
const router = express.Router();
import { registerPatient } from '../controllers/patient.controller.js';

// Changed to /register to reflect the action more accurately
router.post('/register', registerPatient);

export default router;

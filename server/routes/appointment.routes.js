import express from 'express';
const router = express.Router();
import * as appointmentController from '../controllers/appointment.controller.js';

router.post('/book', appointmentController.bookAppointment);

export default router;

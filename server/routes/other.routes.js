import express from 'express';
const router = express.Router();
import * as prescriptionController from '../controllers/prescription.controller.js';
import * as billingController from '../controllers/billing.controller.js';
import * as labController from '../controllers/lab.controller.js';
import * as statsController from '../controllers/stats.controller.js';

// Prescription
router.post('/prescriptions', prescriptionController.createPrescription);

// Billing
router.post('/billing/generate', billingController.generateBill);
router.post('/billing/pay', billingController.makePayment);

// Lab
router.post('/labs/order', labController.orderLabTest);

// Dashboard Stats
router.get('/dashboard/stats', statsController.getDashboardStats);

export default router;

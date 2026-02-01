import express from 'express';
const router = express.Router();
import * as analyticsController from '../controllers/analytics.controller.js';

router.get('/demographics', analyticsController.getPatientDemographics);
router.get('/appointments', analyticsController.getDailyAppointments);
router.get('/doctor-workload', analyticsController.getDoctorWorkload);
router.get('/admission-status', analyticsController.getAdmissionStatus);
router.get('/bed-occupancy', analyticsController.getBedOccupancy);
router.get('/departments', analyticsController.getDepartmentDoctors);
router.get('/visit-types', analyticsController.getVisitTypes);
router.get('/monthly-visits', analyticsController.getMonthlyVisits);
router.get('/billing-summary', analyticsController.getBillingSummary);
router.get('/payment-methods', analyticsController.getPaymentMethods);
router.get('/lab-tests', analyticsController.getLabTestUsage);
router.get('/diagnoses', analyticsController.getTopDiagnoses);

export default router;

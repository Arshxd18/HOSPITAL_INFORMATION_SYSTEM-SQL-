import express from 'express';
const router = express.Router();
import * as visitController from '../controllers/visit.controller.js';

router.post('/record', visitController.recordVisit);

export default router;

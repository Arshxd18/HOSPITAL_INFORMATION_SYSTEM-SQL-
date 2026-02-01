import { executeProcedure } from '../utils/dbHelper.js';

export const orderLabTest = async (req, res, next) => {
    try {
        const { patientId, testTypeId, doctorId } = req.body;
        const result = await executeProcedure('order_lab_test', [patientId, testTypeId, doctorId]);
        res.status(201).json({ success: true, message: 'Lab test ordered', data: result ? result[0] : null });
    } catch (error) {
        next(error);
    }
};

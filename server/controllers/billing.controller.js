import { executeProcedure } from '../utils/dbHelper.js';

export const generateBill = async (req, res, next) => {
    try {
        const { admissionId } = req.body;
        const result = await executeProcedure('generate_bill', [admissionId]);
        res.status(200).json({ success: true, data: result ? result[0] : null });
    } catch (error) {
        next(error);
    }
};

export const makePayment = async (req, res, next) => {
    try {
        const { billId, amount, method } = req.body;
        const result = await executeProcedure('make_payment', [billId, amount, method]);
        res.status(200).json({ success: true, message: 'Payment successful', data: result ? result[0] : null });
    } catch (error) {
        next(error);
    }
};

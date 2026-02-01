import { executeProcedure } from '../utils/dbHelper.js';

export const createPrescription = async (req, res, next) => {
    try {
        const { visitId, medicines, instruction } = req.body;
        const result = await executeProcedure('create_prescription', [
            visitId, JSON.stringify(medicines), instruction
        ]);

        res.status(201).json({
            success: true,
            message: 'Prescription created successfully',
            data: result ? result[0] : null
        });
    } catch (error) {
        next(error);
    }
};

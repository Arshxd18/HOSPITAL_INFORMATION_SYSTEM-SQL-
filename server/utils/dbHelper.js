import db from '../config/db.js';

export const executeProcedure = async (procedureName, params = []) => {
    try {
        // Generate placeholders (?, ?, ?) based on params length
        const placeholders = params.map(() => '?').join(',');
        const sql = `CALL ${procedureName}(${placeholders})`;

        const [result] = await db.execute(sql, params);

        // MySQL returns procedure results as an array of arrays. 
        // Usually the first element is the result set we want.
        return result[0];
    } catch (error) {
        throw error;
    }
};

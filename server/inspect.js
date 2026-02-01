import db from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();

async function inspect(procName) {
    try {
        const [rows] = await db.execute(`
      SELECT PARAMETER_NAME, DATA_TYPE, ORDINAL_POSITION, PARAMETER_MODE
      FROM information_schema.parameters 
      WHERE SPECIFIC_NAME = ? AND SPECIFIC_SCHEMA = ?
      ORDER BY ORDINAL_POSITION
    `, [procName, process.env.DB_NAME || 'hospital_db']);

        console.log(`\nProcedure: ${procName}`);
        if (rows.length === 0) {
            console.log('  (No parameters found or procedure does not exist)');
        } else {
            rows.forEach(r => console.log(`  ${r.ORDINAL_POSITION}. ${r.PARAMETER_NAME} (${r.DATA_TYPE}) - ${r.PARAMETER_MODE}`));
        }
    } catch (err) {
        console.error(`Error inspecting ${procName}:`, err.message);
    }
}

(async () => {
    try {
        const [procs] = await db.execute(`
            SELECT ROUTINE_NAME 
            FROM information_schema.routines 
            WHERE ROUTINE_SCHEMA = ? AND ROUTINE_TYPE = 'PROCEDURE'
        `, [process.env.DB_NAME || 'hospital_db']);

        console.log('Available Procedures:', procs.map(p => p.ROUTINE_NAME).join(', '));

        console.log('\nInspecting ALL procedures to understand flow...');
        for (const p of procs) {
            await inspect(p.ROUTINE_NAME);
        }
    } catch (err) {
        console.error(err);
    }
    process.exit();
})();

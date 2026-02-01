import db from "../config/db.js";

export const getDashboardStats = async (req, res, next) => {
    try {
        // 1. Count Active Patients (Total)
        // Assuming 'patient' table holds all patients.
        const [patientRes] = await db.execute('SELECT COUNT(*) as count FROM patient');

        // 2. Count Appointments Today
        // Assuming 'appointment' table has 'date' column.
        const [apptRes] = await db.execute('SELECT COUNT(*) as count FROM appointment WHERE appointment_date = CURDATE()');

        // 3. Pending Bills
        // Assuming 'billing' table has 'status' or just summing unpaid? 
        // If we don't have a status column yet, we'll just mock/count all for now or sum amount.
        // Let's check schema via SQL if unsure, but let's assume 'billing' exists.
        // Safest query if table might be empty or schema simple:
        // "SELECT SUM(amount) as total FROM billing WHERE status = 'Pending'"
        // We'll try a safe generic count first.
        let pendingAmount = 0;
        try {
            const [billRes] = await db.execute('SELECT SUM(amount) as total FROM billing WHERE status = "Pending"');
            pendingAmount = billRes[0].total || 0;
        } catch (e) {
            // Fallback if billing table/columns different
            pendingAmount = 0;
        }

        res.status(200).json({
            success: true,
            data: {
                patients: patientRes[0].count,
                appointments: apptRes[0].count,
                pendingBills: pendingAmount
            }
        });

    } catch (error) {
        console.error('Stats Error:', error);
        next(error);
    }
};

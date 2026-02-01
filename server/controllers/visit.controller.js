import db from "../config/db.js";

export const recordVisit = async (req, res, next) => {
    try {
        const {
            patientId, doctorId, appointmentId, admissionId,
            date, visitType, notes
        } = req.body;

        // Manual Insert into Visit table as per request to match fields exactly?
        // User listed: PATIENT ID , DOCTOR ID , APPOINTMENT ID , ADMISSION ID , VISIT DATE , VISIT_TYPE (INPATIENT OR OPD ) , NOTES
        // The previous procedure 'record_visit' signature was:
        // p_patient_id, p_doctor_id, p_appointment_id, p_admission_id, p_visit_type, p_notes
        // It didn't take date (probably used NOW()). 

        // Let's use the explicit INSERT for maximum control or the Procedure if it matches.
        // Given the strict requirement "IN MYSQL TABLE THE FIELDS ARE...", manual insert is safer to ensure all fields map 1:1.

        const [result] = await db.execute(
            `INSERT INTO visit 
      (patient_id, doctor_id, appointment_id, admission_id, visit_date, visit_type, notes) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                patientId,
                doctorId,
                appointmentId || null,
                admissionId || null,
                date || new Date(), // Use provided date or now
                visitType || 'OPD',
                notes
            ]
        );

        res.status(201).json({
            success: true,
            message: 'Visit Recorded',
            data: { visitId: result.insertId }
        });
    } catch (error) {
        next(error);
    }
};

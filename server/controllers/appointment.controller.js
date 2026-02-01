import db from "../config/db.js";

export const bookAppointment = async (req, res, next) => {
    try {
        const { patientId, doctorId, date, time } = req.body;

        // Procedure: book_appointment(p_patient_id, p_doctor_id, p_date, p_time)
        // Matches request: PATIENT ID , DOCTOR ID , APPOINTMENT DATE , APPOINTMENT TIME
        // Status is usually set by default in DB or proc.

        const [result] = await db.execute('CALL book_appointment(?, ?, ?, ?)', [
            patientId, doctorId, date, time
        ]);

        res.status(201).json({
            success: true,
            message: 'Appointment Booked',
            data: result[0]
        });
    } catch (error) {
        next(error);
    }
};

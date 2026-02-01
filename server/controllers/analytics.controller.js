import db from '../config/db.js';

export const getPatientDemographics = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM vw_patient_demographics');
        res.json({ success: true, data: rows });
    } catch (error) {
        console.error('Analytics Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getDailyAppointments = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM vw_daily_appointments');
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getDoctorWorkload = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM vw_doctor_workload');
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAdmissionStatus = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM vw_admission_status');
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getBedOccupancy = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM vw_bed_occupancy');
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getDepartmentDoctors = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM vw_department_doctors');
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getVisitTypes = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM vw_visit_types');
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getMonthlyVisits = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM vw_monthly_visits');
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getBillingSummary = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM vw_billing_summary');
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getPaymentMethods = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM vw_payment_methods');
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getLabTestUsage = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM vw_lab_test_usage');
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getTopDiagnoses = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM vw_top_diagnoses');
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

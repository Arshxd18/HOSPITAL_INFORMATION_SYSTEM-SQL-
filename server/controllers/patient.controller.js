import db from '../config/db.js';

// Register Patient ONLY (Matches 'patient' table fields)
export const registerPatient = async (req, res, next) => {
    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();

        const {
            firstName, lastName, dob, age, gender,
            bloodGroup, phone, email, address
        } = req.body;

        console.log('Registering patient:', firstName, lastName);

        // 1. Insert Address
        const [addrRes] = await conn.execute(
            'INSERT INTO address (street, city, state, country, postal_code) VALUES (?, ?, ?, ?, ?)',
            [address || '', 'Unknown', 'Unknown', 'Unknown', '00000']
        );
        const addressId = addrRes.insertId;

        // 2. Insert Patient
        // Fields: first_name, last_name, date_of_birth, age, gender, blood_group, phone, email, address_id
        const [patRes] = await conn.execute(
            `INSERT INTO patient 
      (first_name, last_name, date_of_birth, age, gender, blood_group, phone, email, address_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [firstName, lastName, dob, age, gender, bloodGroup, phone, email, addressId]
        );

        const patientId = patRes.insertId;

        await conn.commit();

        res.status(201).json({
            success: true,
            message: 'Patient Registered Successfully',
            data: {
                patientId,
                firstName,
                lastName,
                age,
                gender,
                phone,
                email,
                dob,
                bloodGroup
            }
        });

    } catch (error) {
        if (conn) await conn.rollback();
        next(error);
    } finally {
        if (conn) conn.release();
    }
};

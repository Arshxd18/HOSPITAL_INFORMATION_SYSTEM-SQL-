Hospital Management System – SQL-Centric Database Project
A comprehensive Hospital Information System focused on advanced MySQL database design, automation, and analytical reporting. This project emphasizes relational modeling, normalization, stored procedures, triggers, and views, with a minimal API-based application to automate data entry into MySQL.

Project Overview
Designed a real-world Hospital Information System with the following highlights:

Implemented 28 fully normalized MySQL tables for robust data management.
Enforced business logic using constraints, triggers, and stored procedures.
Created SQL views for streamlined analysis and reporting.
Built an Excel dashboard using exported SQL view data for visual insights.
Automated data insertion via REST APIs (JSON → MySQL) for seamless integration.
Database Design
Total Tables: 28
Normalization Levels: 1NF, 2NF, 3NF
Key Modules:
Patients, Doctors, Departments
Appointments, Admissions, Visits
Wards, Beds
Billing & Payments
Prescriptions & Medicines
Lab Tests & Results
Staff, Shifts & Attendance
All tables are interconnected using primary keys and foreign keys, ensuring strong data integrity and consistency.

ER Diagram
The ER diagram below illustrates the complete hospital database structure and relationships among all 28 tables.
![Hospital ER Diagram](ER%20DIAGRAM/HOSPITAL_ER_DIAGRAM_FINAL.jpg)


SQL Features Implemented
DDL: Table creation with constraints for data validation.
DML: Structured data insertion for efficient operations.
Stored Procedures: Key procedures include:
admit_patient
discharge_patient
book_appointment
record_visit
generate_bill
make_payment
order_lab_test
create_prescription
Triggers: Automated business rule enforcement.
Views: Pre-aggregated datasets tailored for analysis.
Transactions: Ensuring atomic and reliable operations.
Note: All INSERT and UPDATE operations are exclusively handled through stored procedures for controlled data flow.

Data Analysis & Dashboard
Created multiple SQL views for comprehensive reporting.
Exported view results to Excel for further processing.
Built an analytical dashboard covering:
Admissions & visit trends
Doctor workload analysis
Ward & bed occupancy rates
Billing & revenue insights
Patient demographics
Dashboard Preview
![SQL Dashboard](DASHBOARD_SQL.jpg)

API & Automation Layer
To streamline data entry and eliminate manual SQL execution:

A frontend application collects hospital data via an intuitive UI.
Data is transmitted as JSON via REST APIs.
Backend validation ensures data accuracy.
Backend executes MySQL stored procedures for secure, consistent database storage.
This approach guarantees controlled, consistent data flow and enhances overall system reliability.

Tools & Technologies
MySQL (Core database engine)
SQL (DDL, DML, Views, Triggers, Stored Procedures)
Node.js & Express (API middleware for backend logic)
React (Data entry UI for user interaction)
Excel (Dashboard & reporting visualization)
GitHub (Version control and collaboration)
Key Learnings
Real-world relational database modeling and design.
Advanced SQL automation and integrity enforcement techniques.
API-driven database interactions for modern applications.
Analytics-ready schema design for actionable insights.
Translating raw SQL data into meaningful, visual dashboards.
Author
Mohamed Arshad M
Engineering Student | SQL & Database Systems Enthusiast

Connect with me on LinkedIn or check out the project on GitHub.

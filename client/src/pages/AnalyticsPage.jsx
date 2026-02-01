import React, { useEffect, useState } from 'react';
import BentoCard from '../components/BentoCard';
import { BarChart, TrendingUp, Users, Activity, DollarSign, Calendar, Database, RefreshCw } from 'lucide-react';
import { apiCall } from '../api';
import { motion } from 'framer-motion';
import { BarChart as RechartsBar, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

// Subtle color palette matching Finns aesthetic
const COLORS = ['#888888', '#666666', '#999999', '#555555', '#777777', '#aaaaaa'];
const CHART_COLORS = {
    primary: '#ffffff',
    secondary: '#888888',
    tertiary: '#666666',
    accent: '#aaaaaa'
};

const StatNumber = ({ value, label, icon: Icon, color, delay }) => (
    <BentoCard delay={delay} style={{ minHeight: '120px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{
                    padding: '10px', background: `${color}20`, borderRadius: '10px',
                    border: `1px solid ${color}40`
                }}>
                    <Icon size={20} color={color} />
                </div>
            </div>
            <div>
                <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '4px' }}>{value}</h2>
                <p style={{ color: '#888', fontSize: '0.9rem' }}>{label}</p>
            </div>
        </div>
    </BentoCard>
);

const DataTable = ({ title, data, columns, delay }) => (
    <BentoCard title={title} delay={delay}>
        <div style={{ overflowX: 'auto' }}>
            {data && data.length > 0 ? (
                <table style={{ width: '100%', fontSize: '0.9rem', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #222' }}>
                            {columns.map((col, i) => (
                                <th key={i} style={{
                                    textAlign: 'left', padding: '12px 8px',
                                    color: '#888', fontWeight: 600
                                }}>
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.slice(0, 5).map((row, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid #1a1a1a' }}>
                                {Object.values(row).map((val, j) => (
                                    <td key={j} style={{ padding: '12px 8px', color: '#fff' }}>
                                        {val || 'N/A'}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p style={{ color: '#666', textAlign: 'center', padding: '2rem' }}>No data available</p>
            )}
        </div>
    </BentoCard>
);

const CustomBarChart = ({ title, data, xKey, yKey, color, delay }) => {
    const chartData = data && data.length > 0 ? data.slice(0, 10).map(item => ({
        name: String(item[xKey] || 'N/A').slice(0, 15),
        value: Number(item[yKey]) || 0
    })) : [];

    return (
        <BentoCard title={title} delay={delay}>
            {chartData.length > 0 ? (
                <div style={{ width: '100%', height: '280px', marginTop: '1rem' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <RechartsBar data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 60 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" vertical={false} />
                            <XAxis
                                dataKey="name"
                                stroke="#555"
                                tick={{ fill: '#666', fontSize: 11 }}
                                angle={-45}
                                textAnchor="end"
                                height={80}
                                interval={0}
                            />
                            <YAxis stroke="#555" tick={{ fill: '#666', fontSize: 11 }} />
                            <Tooltip
                                contentStyle={{
                                    background: '#0a0a0a',
                                    border: '1px solid #222',
                                    borderRadius: '12px',
                                    padding: '8px 12px',
                                    color: '#fff'
                                }}
                                cursor={{ fill: 'rgba(255, 255, 255, 0.03)' }}
                            />
                            <Bar
                                dataKey="value"
                                fill={color || CHART_COLORS.secondary}
                                radius={[6, 6, 0, 0]}
                                maxBarSize={80}
                            />
                        </RechartsBar>
                    </ResponsiveContainer>
                </div>
            ) : (
                <p style={{ color: '#666', textAlign: 'center', padding: '2rem' }}>No data available</p>
            )}
        </BentoCard>
    );
};

const CustomLineChart = ({ title, data, xKey, yKey, color, delay }) => {
    const chartData = data && data.length > 0 ? data.slice(0, 15).map(item => ({
        name: String(item[xKey] || 'N/A').slice(0, 15),
        value: Number(item[yKey]) || 0
    })) : [];

    return (
        <BentoCard title={title} delay={delay}>
            {chartData.length > 0 ? (
                <div style={{ width: '100%', height: '280px', marginTop: '1rem' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 60 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" vertical={false} />
                            <XAxis
                                dataKey="name"
                                stroke="#555"
                                tick={{ fill: '#666', fontSize: 11 }}
                                angle={-45}
                                textAnchor="end"
                                height={80}
                                interval={0}
                            />
                            <YAxis stroke="#555" tick={{ fill: '#666', fontSize: 11 }} />
                            <Tooltip
                                contentStyle={{
                                    background: '#0a0a0a',
                                    border: '1px solid #222',
                                    borderRadius: '12px',
                                    padding: '8px 12px',
                                    color: '#fff'
                                }}
                                cursor={{ strokeDasharray: '3 3' }}
                            />
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke={color || CHART_COLORS.primary}
                                strokeWidth={2}
                                dot={{ fill: color || CHART_COLORS.primary, r: 3 }}
                                activeDot={{ r: 5 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <p style={{ color: '#666', textAlign: 'center', padding: '2rem' }}>No data available</p>
            )}
        </BentoCard>
    );
};

const CustomPieChart = ({ title, data, nameKey, valueKey, delay }) => {
    const chartData = data && data.length > 0 ? data.slice(0, 6).map(item => ({
        name: String(item[nameKey] || 'N/A'),
        value: Number(item[valueKey]) || 0
    })) : [];

    return (
        <BentoCard title={title} delay={delay}>
            {chartData.length > 0 ? (
                <div style={{ width: '100%', height: '280px', marginTop: '1rem' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                labelLine={{ stroke: '#444' }}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                outerRadius={90}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                        stroke="#0a0a0a"
                                        strokeWidth={2}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    background: '#0a0a0a',
                                    border: '1px solid #222',
                                    borderRadius: '12px',
                                    padding: '8px 12px',
                                    color: '#fff'
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <p style={{ color: '#666', textAlign: 'center', padding: '2rem' }}>No data available</p>
            )}
        </BentoCard>
    );
};

const AnalyticsPage = () => {
    const [loading, setLoading] = useState(true);
    const [analytics, setAnalytics] = useState({
        demographics: [],
        appointments: [],
        doctorWorkload: [],
        admissionStatus: [],
        bedOccupancy: [],
        departments: [],
        visitTypes: [],
        monthlyVisits: [],
        billingSummary: [],
        paymentMethods: [],
        labTests: [],
        diagnoses: []
    });

    const fetchAllAnalytics = async () => {
        setLoading(true);
        try {
            const endpoints = [
                { key: 'demographics', url: '/analytics/demographics' },
                { key: 'appointments', url: '/analytics/appointments' },
                { key: 'doctorWorkload', url: '/analytics/doctor-workload' },
                { key: 'admissionStatus', url: '/analytics/admission-status' },
                { key: 'bedOccupancy', url: '/analytics/bed-occupancy' },
                { key: 'departments', url: '/analytics/departments' },
                { key: 'visitTypes', url: '/analytics/visit-types' },
                { key: 'monthlyVisits', url: '/analytics/monthly-visits' },
                { key: 'billingSummary', url: '/analytics/billing-summary' },
                { key: 'paymentMethods', url: '/analytics/payment-methods' },
                { key: 'labTests', url: '/analytics/lab-tests' },
                { key: 'diagnoses', url: '/analytics/diagnoses' }
            ];

            const results = await Promise.allSettled(
                endpoints.map(({ key, url }) =>
                    apiCall(url).then(res => ({ key, data: res.success ? res.data : [] }))
                )
            );

            const newAnalytics = {};
            results.forEach((result) => {
                if (result.status === 'fulfilled') {
                    newAnalytics[result.value.key] = result.value.data;
                } else {
                    console.error('Failed to fetch:', result.reason);
                }
            });

            setAnalytics(prev => ({ ...prev, ...newAnalytics }));
        } catch (err) {
            console.error('Analytics fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllAnalytics();
    }, []);

    return (
        <div className="page-container">
            {/* Header */}
            <div style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', marginBottom: '3rem',
                flexWrap: 'wrap', gap: '1rem'
            }}>
                <div>
                    <h1 style={{ fontSize: '3rem', fontWeight: '800', lineHeight: 1 }}>
                        Analytics Dashboard
                    </h1>
                    <p style={{ marginTop: '0.5rem', color: '#888' }}>
                        Real-time insights from hospital data • Last updated: {new Date().toLocaleTimeString()}
                    </p>
                </div>
                <button
                    onClick={fetchAllAnalytics}
                    className="btn-primary"
                    style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
                    disabled={loading}
                >
                    <RefreshCw size={18} className={loading ? 'spin' : ''} /> Refresh
                </button>
            </div>

            {loading && (
                <div style={{ textAlign: 'center', padding: '4rem', color: '#666' }}>
                    <RefreshCw size={40} className="spin" />
                    <p style={{ marginTop: '1rem' }}>Loading analytics...</p>
                </div>
            )}

            {!loading && (
                <>
                    {/* SECTION 1: Patient & Demographics */}
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#fff' }}>
                        Patient & Demographics
                    </h2>
                    <div className="bento-grid" style={{ marginBottom: '3rem' }}>
                        <CustomPieChart
                            title="Gender Distribution"
                            data={analytics.demographics.reduce((acc, curr) => {
                                const exists = acc.find(a => a.name === curr.gender);
                                if (exists) exists.value++;
                                else acc.push({ name: curr.gender, value: 1 });
                                return acc;
                            }, [])}
                            nameKey="name"
                            valueKey="value"
                            delay={0.1}
                            className="col-span-2"
                        />
                        <CustomBarChart
                            title="Age Groups"
                            data={(() => {
                                const groups = { '0-18': 0, '19-35': 0, '36-50': 0, '51-65': 0, '65+': 0 };
                                analytics.demographics.forEach(p => {
                                    // Calculate age from DOB if needed, or assume raw data might have age
                                    // Assuming raw demographics has 'date_of_birth' or 'age'
                                    const age = p.age || (p.date_of_birth ? new Date().getFullYear() - new Date(p.date_of_birth).getFullYear() : 0);
                                    if (age <= 18) groups['0-18']++;
                                    else if (age <= 35) groups['19-35']++;
                                    else if (age <= 50) groups['36-50']++;
                                    else if (age <= 65) groups['51-65']++;
                                    else groups['65+']++;
                                });
                                return Object.entries(groups).map(([name, value]) => ({ name, value }));
                            })()}
                            xKey="name"
                            yKey="value"
                            color="#666666"
                            delay={0.1}
                            className="col-span-2"
                        />
                    </div>

                    {/* SECTION 2: Appointments & Visits */}
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#fff' }}>
                        Appointments & Visits
                    </h2>
                    <div className="bento-grid" style={{ marginBottom: '3rem' }}>
                        <CustomLineChart
                            title="Daily Appointments Trend"
                            data={analytics.appointments}
                            xKey={analytics.appointments[0] ? Object.keys(analytics.appointments[0])[0] : 'date'}
                            yKey={analytics.appointments[0] ? Object.keys(analytics.appointments[0])[1] : 'count'}
                            color="#888888"
                            delay={0.2}
                            className="col-span-3"
                        />
                        <CustomPieChart
                            title="Visit Types"
                            data={analytics.visitTypes}
                            nameKey={analytics.visitTypes[0] ? Object.keys(analytics.visitTypes[0])[0] : 'type'}
                            valueKey={analytics.visitTypes[0] ? Object.keys(analytics.visitTypes[0])[1] : 'count'}
                            delay={0.3}
                            className="col-span-1"
                        />
                    </div>

                    {/* SECTION 3: Department Performance */}
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#fff' }}>
                        Department Performance
                    </h2>
                    <div className="bento-grid" style={{ marginBottom: '3rem' }}>
                        <CustomBarChart
                            title="Department Distribution"
                            data={analytics.departments}
                            xKey={analytics.departments[0] ? Object.keys(analytics.departments[0])[0] : 'department'}
                            yKey={analytics.departments[0] ? Object.keys(analytics.departments[0])[1] : 'count'}
                            color="#999999"
                            delay={0.5}
                            className="col-span-2"
                        />
                    </div>

                    {/* SECTION 4: Admission & Bed Management */}
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#fff' }}>
                        🏥 Admission & Bed Management
                    </h2>
                    <div className="bento-grid" style={{ marginBottom: '3rem' }}>
                        <DataTable
                            title="Admission Status"
                            data={analytics.admissionStatus}
                            columns={analytics.admissionStatus[0] ? Object.keys(analytics.admissionStatus[0]) : []}
                            delay={0.6}
                            className="col-span-2"
                        />
                        <DataTable
                            title="Bed Occupancy"
                            data={analytics.bedOccupancy}
                            columns={analytics.bedOccupancy[0] ? Object.keys(analytics.bedOccupancy[0]) : []}
                            delay={0.7}
                            className="col-span-2"
                        />
                    </div>

                    {/* SECTION 5: Financial Analysis */}
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#fff' }}>
                        💰 Financial Analysis
                    </h2>
                    <div className="bento-grid" style={{ marginBottom: '3rem' }}>
                        <CustomLineChart
                            title="Revenue Trend"
                            data={analytics.billingSummary}
                            xKey={analytics.billingSummary[0] ? Object.keys(analytics.billingSummary[0])[0] : 'date'}
                            yKey={analytics.billingSummary[0] ? Object.keys(analytics.billingSummary[0])[1] : 'amount'}
                            color="#aaaaaa"
                            delay={0.8}
                            className="col-span-3"
                        />
                        <CustomPieChart
                            title="Payment Methods"
                            data={analytics.paymentMethods}
                            nameKey={analytics.paymentMethods[0] ? Object.keys(analytics.paymentMethods[0])[0] : 'method'}
                            valueKey={analytics.paymentMethods[0] ? Object.keys(analytics.paymentMethods[0])[1] : 'amount'}
                            delay={0.9}
                            className="col-span-1"
                        />
                    </div>

                    {/* SECTION 6: Medical & Lab Analytics */}
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#fff' }}>
                        🧪 Medical & Lab Analytics
                    </h2>
                    <div className="bento-grid" style={{ marginBottom: '3rem' }}>
                        <CustomBarChart
                            title="Top Diagnoses"
                            data={analytics.diagnoses}
                            xKey={analytics.diagnoses[0] ? Object.keys(analytics.diagnoses[0])[0] : 'diagnosis'}
                            yKey={analytics.diagnoses[0] ? Object.keys(analytics.diagnoses[0])[1] : 'count'}
                            color="#777777"
                            delay={1.0}
                            className="col-span-2"
                        />
                        <CustomBarChart
                            title="Lab Test Usage"
                            data={analytics.labTests}
                            xKey={analytics.labTests[0] ? Object.keys(analytics.labTests[0])[0] : 'test'}
                            yKey={analytics.labTests[0] ? Object.keys(analytics.labTests[0])[1] : 'usage'}
                            color="#999999"
                            delay={1.1}
                            className="col-span-2"
                        />
                    </div>

                    {/* SECTION 7: Trends */}
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#fff' }}>
                        📈 Long-term Trends
                    </h2>
                    <div className="bento-grid">
                        <CustomLineChart
                            title="Monthly Visit Trends"
                            data={analytics.monthlyVisits}
                            xKey={analytics.monthlyVisits[0] ? Object.keys(analytics.monthlyVisits[0])[0] : 'month'}
                            yKey={analytics.monthlyVisits[0] ? Object.keys(analytics.monthlyVisits[0])[1] : 'visits'}
                            color="#ffffff"
                            delay={1.2}
                            className="col-span-4"
                        />
                    </div>
                </>
            )}

            <style>{`
                .spin { animation: spin 1s linear infinite; }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default AnalyticsPage;

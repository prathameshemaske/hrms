import { useEffect, useState } from "react";


const HolidayList = () => {
    const [holidays, setHolidays] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                const data = await getHolidays();
                setHolidays(data);
            } catch (err) {
                console.error("Failed to load holidays", err);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    const groupedByMonth = holidays.reduce((acc, h) => {
        const month = new Date(h.date).toLocaleString("default", {
            month: "long",
            year: "numeric",
        });

        acc[month] = acc[month] || [];
        acc[month].push(h);
        return acc;
    }, {});

    return (
        <div style={styles.page}>
            {/* HEADER */}
            <div style={styles.header}>
                <h2 style={styles.title}>Holiday Calendar</h2>
                <p style={styles.subtitle}>
                    Company-wide holidays and observances
                </p>
            </div>

            {loading && <p style={styles.empty}>Loading holidays…</p>}

            {!loading && holidays.length === 0 && (
                <p style={styles.empty}>No holidays configured</p>
            )}

            {/* HOLIDAY MONTH SECTIONS */}
            {!loading &&
                Object.keys(groupedByMonth).map((month) => (
                    <div key={month} style={styles.monthSection}>
                        <h3 style={styles.monthTitle}>{month}</h3>

                        <div style={styles.grid}>
                            {groupedByMonth[month].map((h) => (
                                <div key={h.id} style={styles.card}>
                                    <div style={styles.dateBox}>
                                        <div style={styles.day}>
                                            {new Date(h.date).getDate()}
                                        </div>
                                        <div style={styles.weekday}>
                                            {new Date(h.date).toLocaleString("default", {
                                                weekday: "short",
                                            })}
                                        </div>
                                    </div>

                                    <div>
                                        <div style={styles.holidayName}>{h.name}</div>
                                        {h.description && (
                                            <div style={styles.desc}>{h.description}</div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default HolidayList;

/* ================= STYLES ================= */

const styles = {
    page: {
        padding: 28,
        background: "#f4f6f8",
        minHeight: "100vh",
    },

    header: {
        marginBottom: 24,
    },

    title: {
        fontSize: 24,
        fontWeight: 700,
    },

    subtitle: {
        fontSize: 14,
        color: "#6b7280",
    },

    empty: {
        textAlign: "center",
        padding: 24,
        color: "#6b7280",
    },

    monthSection: {
        marginBottom: 32,
    },

    monthTitle: {
        fontSize: 18,
        fontWeight: 700,
        marginBottom: 12,
        color: "#111827",
    },

    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: 16,
    },

    card: {
        background: "#ffffff",
        borderRadius: 14,
        padding: 16,
        display: "flex",
        gap: 14,
        boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
        alignItems: "center",
    },

    dateBox: {
        width: 56,
        height: 56,
        borderRadius: 12,
        background: "#2563eb",
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
    },

    day: {
        fontSize: 18,
        fontWeight: 700,
        lineHeight: 1,
    },

    weekday: {
        fontSize: 11,
        opacity: 0.9,
    },

    holidayName: {
        fontSize: 15,
        fontWeight: 600,
        color: "#111827",
    },

    desc: {
        fontSize: 13,
        color: "#6b7280",
        marginTop: 2,
    },
};

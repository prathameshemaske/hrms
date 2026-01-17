const ConfirmModal = ({
    open,
    title,
    message,
    onConfirm,
    onCancel,
}) => {
    if (!open) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                {/* ICON */}
                <div style={styles.iconWrapper}>
                    <span style={styles.icon}>❌</span>
                </div>

                {/* CONTENT */}
                <h3 style={styles.title}>{title}</h3>
                <p style={styles.message}>{message}</p>

                {/* ACTIONS */}
                <div style={styles.actions}>
                    <button style={styles.secondaryBtn} onClick={onCancel}>
                        Skip Bug Creation
                    </button>

                    <button style={styles.primaryBtn} onClick={onConfirm}>
                        Create Bug
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;

/* ================= STYLES ================= */

const styles = {
    overlay: {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
    },

    modal: {
        background: "#ffffff",
        width: 420,
        padding: "28px 24px",
        borderRadius: 16,
        textAlign: "center",
        boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
        animation: "fadeIn 0.15s ease-out",
    },

    iconWrapper: {
        width: 48,
        height: 48,
        borderRadius: "50%",
        background: "#fee2e2",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto 12px",
    },

    icon: {
        fontSize: 22,
    },

    title: {
        fontSize: 18,
        fontWeight: 700,
        color: "#111827",
        marginBottom: 6,
    },

    message: {
        fontSize: 14,
        color: "#374151",
        marginBottom: 22,
    },

    actions: {
        display: "flex",
        justifyContent: "center",
        gap: 12,
    },

    primaryBtn: {
        background: "#dc2626",
        color: "#ffffff",
        padding: "8px 16px",
        borderRadius: 8,
        border: "none",
        cursor: "pointer",
        fontWeight: 600,
    },

    secondaryBtn: {
        background: "#f3f4f6",
        color: "#111827",
        padding: "8px 16px",
        borderRadius: 8,
        border: "1px solid #d1d5db",
        cursor: "pointer",
        fontWeight: 500,
    },
};

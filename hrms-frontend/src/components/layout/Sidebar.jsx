import { Link, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { MENU_ITEMS } from "../../utils/menuConfig";
import { hasAccess } from "../../utils/roleCheck";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <div style={styles.sidebar}>
      <h3 style={styles.title}>HRMS</h3>

      {MENU_ITEMS.map((item) =>
        hasAccess(user.role, item.roles) ? (
          <Link
            key={item.path}
            to={item.path}
            style={{
              ...styles.link,
              background:
                location.pathname === item.path ? "#e3f2fd" : "transparent",
            }}
          >
            {item.label}
          </Link>
        ) : null
      )}

      <button style={styles.logout} onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;

const styles = {
  sidebar: {
    width: 220,
    minHeight: "100vh",
    background: "#ffffff",
    padding: 20,
    borderRight: "1px solid #ddd",
  },
  title: { marginBottom: 20 },
  link: {
    display: "block",
    padding: 10,
    marginBottom: 6,
    textDecoration: "none",
    color: "#333",
    borderRadius: 4,
  },
  logout: {
    marginTop: 30,
    width: "100%",
    padding: 8,
    background: "#d32f2f",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};

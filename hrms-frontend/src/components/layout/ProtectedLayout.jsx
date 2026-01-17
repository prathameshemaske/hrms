import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const ProtectedLayout = () => {
  return (
    <div style={styles.app}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <Sidebar />
      </aside>

      {/* Main content */}
      <main style={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedLayout;

const styles = {
  app: {
    display: "flex",
    width: "100vw",
    minHeight: "100vh",
    overflow: "hidden",
    background: "#f4f6f8",
  },

  sidebar: {
    width: "260px",
    minWidth: "260px",
    background: "#111827",
    color: "#fff",
    overflowY: "auto",
  },

  content: {
    flex: 1,
    padding: "24px",
    overflowY: "auto",
    background: "#f4f6f8",
  },
};

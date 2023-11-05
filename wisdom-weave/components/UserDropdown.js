import React from "react";
import { useContext } from "react";
import { WisdomWeaveContext } from "@/context/WisdomWeaveContext";
import Link from "next/link";

const styles = {
  dropdownContainer: {
    background: "#fff",
    padding: "10px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    position: "absolute",
    right: "0",
    marginTop: "8px",
  },
  dropdownLink: {
    color: "#333",
    textDecoration: "none",
    fontSize: "0.9rem",
    display: "block",
    padding: "8px 0",
    cursor: "pointer",
    borderBottom: "1px solid #ccc",
  },
  userInfo: {
    color: "#333",
    fontSize: "0.9rem",
    borderBottom: "1px solid #ccc",
    padding: "8px 0",
  },
  logoutButton: {
    color: "#ff5252",
    fontSize: "0.9rem",
    cursor: "pointer",
    width: "100%",
    textAlign: "left",
    padding: "8px 0",
  },
};


const UserDropdown = () => {
  const { currentUser, handleLogout } = useContext(WisdomWeaveContext);

  return (
    <div style={styles.dropdownContainer}>
      <Link href="/UserActivity">
        <div style={styles.dropdownLink}>User Activity</div>
      </Link>
      <hr style={styles.hr}></hr>
      <p style={styles.userInfo}>{currentUser.email}</p>
      <button
        style={styles.logoutButton}
        onClick={handleLogout}
      >
        Log Out
      </button>
    </div>
  );
};

export default UserDropdown;
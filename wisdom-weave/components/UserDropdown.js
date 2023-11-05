import React from "react";
import { useContext } from "react";
import { WisdomWeaveContext } from "@/context/WisdomWeaveContext";
import Link from "next/link";
import UserActivity from "../pages/UserActivity";

const styles = {};

const UserDropdown = () => {
  const { currentUser, handleLogout } = useContext(WisdomWeaveContext);

  return (
    <div className="bg-white p-2 rounded shadow-lg absolute right-0 mt-2">
      <Link href="/UserActivity">
        <div className={styles.dropdownLink}>User Activity</div>
      </Link>
      <hr class="border-b-1 border-gray-700 py-1"></hr>
      <p className="text-gray-800 text-[0.9rem]">{currentUser.email}</p>
      <button
        className="text-red-500 hover:text-red-700 block w-full text-left"
        onClick={handleLogout}
      >
        Log Out
      </button>
    </div>
  );
};

export default UserDropdown;

import Image from "next/image";
import smallLogo from "../static/smallLogo.png";
import { useContext, useEffect, useState } from "react";
import { WisdomWeaveContext } from "@/context/WisdomWeaveContext";
import Modal from "react-modal";
import { useRouter } from "next/router";
import Link from "next/link";
import UploadModal from "./UploadModal";
import { AiOutlineSearch } from "react-icons/ai";
import UserDropdown from "./UserDropdown";

Modal.setAppElement("#__next");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    padding: 0,
    border: "none",
  },
  overlay: {
    backgroundColor: "rgba(10, 11, 13, 0.75)",
  },
};

const styles = {
  wrapper: "flex justify-center gap-10 p-5 bg-[#CEE6F3]",
  content: "max-w-7xl flex-1 flex justify-between gap-10 mr-5",
  logoContainer: "flex items-center flex-start cursor-pointer gap-[0.4rem]",
  mainTitle: "font-calligraphy text-[2.8rem] pt-[0.1rem]",
  bannerNav: "flex cursor-pointer space-x-5 items-center",
  accentedButton: "bg-[#10368E] text-white py-2 px-5 rounded-full",
  searchBar:
    "flex items-center gap-[.6rem] h-[2.6rem] border-2 border-[#10368E] px-[1rem] rounded-full",
  searchInput:
    "border-none outline-none bg-[#CEE6F3] w-full text-[#10368E] font-semibold",
  searchIcon: "text-[#10368E] font-semibold",
  userImageContainer: `w-[2.4rem] h-[2.4rem] rounded-full overflow-hidden border-2 border-[#10368E]`,
  userImage: `p-0`,
};

const Header = () => {
  const {
    currentUser,
    handleUserAuth,
    handleLogout,
    searchQuery,
    setSearchQuery,
  } = useContext(WisdomWeaveContext);
  const router = useRouter();

  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!isUserDropdownOpen);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.logoContainer}>
            <Image src={smallLogo} height={50} width={50} alt="headerImg" />
          <Link href={"/"}>
            <h1 className={styles.mainTitle}>WisdomWeave</h1>
          </Link>
        </div>
        {currentUser ? (
          <div className={styles.bannerNav}>
            <div className={styles.searchBar}>
              <input
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
                className={styles.searchInput}
                placeholder="Search"
                type="text"
              />
              <button type="submit">
                <AiOutlineSearch className={styles.searchIcon} />
              </button>
            </div>
            <Link href={"?addNew=1"}>
              <div className={styles.accentedButton}>Write</div>
            </Link>
            {/* <div className={styles.accentedButton} onClick={handleLogout}>
              Log Out
            </div> */}
            <div className="relative">
              <button onClick={toggleUserDropdown}>
                <div className={styles.userImageContainer}>
                  <Image
                    className={styles.userImage}
                    src={`https://res.cloudinary.com/dcq1kcego/image/fetch/${currentUser.photoURL}`}
                    alt="author"
                    width={100}
                    height={100}
                  />
                </div>
              </button>
              {isUserDropdownOpen && <UserDropdown />}
            </div>
          </div>
        ) : (
          <div className={styles.bannerNav}>
            <div onClick={handleUserAuth} className={styles.accentedButton}>
              Sign In
            </div>
          </div>
        )}
      </div>
      <Modal
        style={customStyles}
        isOpen={Boolean(router.query.addNew)}
        onRequestClose={() => router.push("/")}
      >
        <UploadModal />
      </Modal>
    </div>
  );
};

export default Header;

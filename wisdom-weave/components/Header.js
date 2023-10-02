import Image from "next/image";
import smallLogo from "../static/smallLogo.png";
import { useContext, useEffect, useState } from "react";
import { WisdomWeaveContext } from "@/context/WisdomWeaveContext";
import Modal from "react-modal";
import { useRouter } from "next/router";
import Link from "next/link";
import UploadModal from "./UploadModal";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

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
};

const Header = () => {
  const { currentUser, handleUserAuth, users } = useContext(WisdomWeaveContext);

  const router = useRouter();
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <Image src={smallLogo} height={50} width={50}/>
          <h1 className={styles.mainTitle}>WisdomWeave</h1>
        </div>
        {currentUser ? (
          <div className={styles.bannerNav}>
            <div>Our Story</div>
            <div>Membership</div>
            <Link href={"?addNew=1"}>
              <div className={styles.accentedButton}>Write</div>
            </Link>
            <div
              className={styles.accentedButton}
              onClick={() => {
                signOut(auth);
              }}
            >
              Log Out
            </div>
          </div>
        ) : (
          <div className={styles.bannerNav}>
            <div>Our Story</div>
            <div>Membership</div>
            <div onClick={handleUserAuth}>Sign In</div>
            <div className={styles.accentedButton}>Get Started</div>
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

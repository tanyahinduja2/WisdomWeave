import Image from "next/image";
import Logo from "./../static/banner.png";
import { useContext } from "react";
import { WisdomWeaveContext } from "../context/WisdomWeaveContext";

const styles = {
  wrapper: `h-max-[10rem] flex items-center justify-center border-y border-black bg-[#CEE6F3]`,
  content: `max-w-7xl flex-1 flex items-center justify-between`,
  accentedButton: `bg-[#10368E] text-white py-2 px-4 rounded-full`,
};

const Banner = () => {
  const { currentUser, handleUserAuth } = useContext(WisdomWeaveContext);
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className="space-y-3 px-10 py-10 flex-[3]">
          <h1 className="max-w-xm text-[6rem] font-mediumSerif">
            Ideas Unboxed.
          </h1>
          <h3 className="text-4xl pb-[3rem]">
            Dive into the world of ideas.
          </h3>
          {currentUser ? (
            <button className={styles.accentedButton}>
              Get unlimited access
            </button>
          ) : (
            <button onClick={handleUserAuth} className={styles.accentedButton}>
              Start Reading
            </button>
          )}
        </div>

        <Image
          className="hidden h-50 md:inline-flex object-contain flex-1 mr-[8rem] object-cover"
          src={Logo.src}
          height={300}
          width={300}
          alt="logo"
        />
      </div>
    </div>
  );
};

export default Banner;

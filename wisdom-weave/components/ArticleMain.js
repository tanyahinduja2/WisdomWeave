import Image from "next/image";
import Qazi from "../static/qazi.jpg";
import { AiFillPlayCircle } from "react-icons/ai";
import { IoLogoTwitter } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { GrLinkedin } from "react-icons/gr";
import { HiOutlineLink } from "react-icons/hi";
import { BiBookmarks } from "react-icons/bi";
import { FiMoreHorizontal } from "react-icons/fi";
import Banner from "../static/banner.png";

const styles = {
  wrapper: `flex items-center justify-center flex-[3] border-l border-r `,
  content: `h-screen px-[2rem] w-full`,
  postHeaderContainer:
    "flex justify-between items-center mt-[2.2rem] mb-[1.2rem]",
  referencesContainer: `flex justify-between items-center mt-[2.2rem] mb-[1.2rem]`,
  authorContainer: `flex gap-[1rem]`,
  authorProfileImageContainer: `h-[3rem] w-[3rem] grid center rounded-full overflow-hidden`,
  image: `object-cover`,
  column: `flex-1 flex flex-col justify-center`,
  postDetails: `flex gap-[.2rem] text-[#787878]`,
  listenButton: `flex items-center gap-[.2rem] text-[#1A8917]`,
  socials: `flex gap-[1rem] text-[#787878] cursor-pointer`,
  space: `w-[.5rem]`,
  articleMainContainer: `flex flex-col gap-[1rem] pb-[1.8rem]`,
  bannerContainer: `h-[18rem] w-full grid center overflow-hidden mb-[2rem]`,
  title: `font-bold text-3xl`,
  subtitle: `font-mediumSerif text-[1.2rem] text-[#292929] font-semibold`,
  articleText: `font-mediumSerif text-[1.2rem] text-[#292929]`,
};

const ArticleMain = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.postHeaderContainer}>
          <div className={styles.authorContainer}>
            <div className={styles.authorProfileImageContainer}>
              <Image
                className={styles.image}
                src={Qazi}
                alt="author"
                width={100}
                height={100}
              />
            </div>
            <div className={styles.column}>
              <div>Tanya Hinduja</div>
              <div className={styles.postDetails}>
                <span>June 15 • 5 min read • </span>
                <span className={styles.listenButton}>
                  <AiFillPlayCircle />
                  Listen
                </span>
              </div>
            </div>
          </div>
          <div className={styles.socials}>
            <IoLogoTwitter />
            <FaFacebook />
            <GrLinkedin />
            <HiOutlineLink />
            <div className={styles.space} />
            <BiBookmarks />
            <FiMoreHorizontal />
          </div>
        </div>
        <div className={styles.articleMainContainer}>
          <div className={styles.bannerContainer}>
            <Image
              className={styles.image}
              src={Banner}
              alt="banner"
              height={100}
              width={100}
            />
          </div>
          <h1 className={styles.title}>
            7 free tools that will make you more productive in 2023
          </h1>
          <h4 className={styles.subtitle}>
            <div>Tanya Hinduja, June 15, 2023</div>
            <div>Brief: Productivity is a skill that can be learned</div>
          </h4>
          <div className={styles.articleText}>
            In a colorful world, an apple, banana, and a cat chased a dog
            through the forest, while an elephant and a frog played music on a
            guitar near their cozy house. Children enjoyed ice cream under the
            bright sun, jumping with kites and lemons in their hands. Monkeys
            climbed trees as they scribbled in notebooks by the ocean, while
            penguins danced under a rainbow. Sunflowers swayed in the breeze as
            tigers roared nearby, and an umbrella protected them from a sudden
            rain shower. A volcano erupted in the distance, and a waterfall
            sparkled like a xylophone's melody. Yaks and zebras roamed the
            plains, creating a beautiful landscape.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleMain;

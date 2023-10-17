import Image from "next/image";
import { AiFillPlayCircle } from "react-icons/ai";
import { IoLogoTwitter } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { GrLinkedin } from "react-icons/gr";
import { HiOutlineLink } from "react-icons/hi";
import { BiBookmarks } from "react-icons/bi";
import { FiMoreHorizontal } from "react-icons/fi";

const styles = {
  wrapper: `flex items-center justify-center flex-[3] border-l border-r `,
  content: `h-screen px-[2rem] w-full`,
  postHeaderContainer:
    "flex justify-between items-center mt-[2.2rem] mb-[1.2rem]",
  referencesContainer: `flex justify-between items-center mt-[2.2rem] mb-[1.2rem]`,
  authorContainer: `flex gap-[1rem]`,
  authorProfileImageContainer: `h-[3rem] w-[3rem] grid items-center rounded-full overflow-hidden`,
  image: `object-cover h-full w-full`,
  column: `flex-1 flex flex-col justify-center`,
  postDetails: `flex gap-[.2rem] text-[#787878]`,
  listenButton: `flex items-center gap-[.2rem] text-[#1A8917]`,
  socials: `flex gap-[1rem] text-[#787878] cursor-pointer`,
  space: `w-[.5rem]`,
  articleMainContainer: `flex flex-col gap-[1rem] pb-[1.8rem]`,
  bannerContainer: `h-[20rem] w-full grid center overflow-hidden mb-[2rem] items-center mx-auto items-center`,
  title: `font-bold text-3xl font-mediumSerif`,
  subtitle: `font-mediumSerif text-[1.2rem] text-[#292929] font-semibold`,
  articleText: `font-mediumSerif text-[1.2rem] text-[#292929]`,
};

const ArticleMain = ({ post, author }) => {
  console.log(post, author);
  console.log(author.data?.imageURL);

  const renderQuillContent = (htmlContent) => {
    return { __html: htmlContent };
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.postHeaderContainer}>
          <div className={styles.authorContainer}>
            <div className={styles.authorProfileImageContainer}>
              <Image
                className={styles.image}
                src={`https://res.cloudinary.com/dcq1kcego/image/fetch/${author.data?.imageURL}`}
                alt="author"
                width={100}
                height={400}
              />
            </div>
            <div className={styles.column}>
              <div>{author.data?.name}</div>
              <div className={styles.postDetails}>
                <span>
                  {new Date(post.data?.postedOn).toLocaleString("en-US", {
                    day: "numeric",
                    month: "short",
                  })}{" "}
                  • {post.data?.postLength} min read •{" "}
                </span>
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
              src={`https://res.cloudinary.com/dcq1kcego/image/fetch/${post.data?.bannerImage}`}
              alt="banner"
              height={1400}
              width={800}
            />
          </div>
          <h1 className={styles.title}>{post.data?.title}</h1>
          <h4 className={styles.subtitle}>
            <div>
              {post.data?.authorName},{" "}
              {new Date(post.data?.postedOn).toLocaleString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </div>
            <div>Brief: {post.data?.brief}</div>
          </h4>
          <div
            className={styles.articleText}
            dangerouslySetInnerHTML={renderQuillContent(post.data?.body)}
          />
        </div>
      </div>
    </div>
  );
};

export default ArticleMain;

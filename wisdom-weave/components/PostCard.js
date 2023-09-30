import Image from "next/image";
import Logo from "../static/logo.png";
import { FiBookmark } from "react-icons/fi"
import Link from "next/link"

const styles = {
  wrapper: `max-w-[46rem] h-[10rem] flex items-center gap-[1rem] cursor-pointer`,
  postDetails: `flex-[2.5] flex flex-col`,
  authorContainer: `flex gap-[.4rem]`,
  authorName: `font-semibold`,
  authorImageContainer: `grid place-items-center rounded-full overflow-hidden h-[1.4rem] w-[1.4rem]`,
  authorImage: `object-cover`,
  title: `font-bold text-2xl`,
  briefing: `text-[#787878]`,
  detailsContainer: `flex items-center justify-between text-[#787878]`,
  articleDetails: `my-2 text-[.8rem]`,
  bookmarkContainer: `cursor-pointer`,
  category: `bg-[#F2F3F2] p-1 rounded-full`,
  thumbnailContainer: `flex-1`,
};

const PostCard = () => {
  return (
    <>
    <Link href="/post/123">
      <div className={styles.wrapper}>
        <div className={styles.postDetails}>
          <div className={styles.authorContainer}>
            <div className={styles.authorImageContainer}>
              <Image src={Logo.src} alt="thumbnail" height={100} width={100} />
            </div>

            <div className={styles.authorName}>Tanya Hinduja</div>
          </div>
          <h1 className={styles.title}>
            7 free tools that will make you more productive in 2023
          </h1>
          <div className={styles.briefing}>
            Productivity is a skill that can be learned
          </div>
          <div className={styles.detailsContainer}>
            <span className={styles.articleDetails}>
              Jun 15 • 5 min read • {" "}
              <span className={styles.category}>Productivity</span>
            </span>
            <span className={styles.bookmarkContainer}>
              <FiBookmark className="w-5 h-5" />
            </span>
          </div>
        </div>
        <div className={styles.thumbnailContainer}>
          <Image 
            width={100}
            height={100}
            src={Logo}
          />
        </div>
      </div>
    </Link>
    </>
  );
};

export default PostCard;

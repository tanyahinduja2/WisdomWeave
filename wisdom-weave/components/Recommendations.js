import Image from "next/image";
import { AiOutlineSearch } from "react-icons/ai";
import { MdMarkEmailUnread } from "react-icons/md";
import { useState, useContext, useEffect } from "react";
import { WisdomWeaveContext } from "../context/WisdomWeaveContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import Comment from "./Comment";
import Link from "next/link";

const styles = {
  wrapper: `h-screen min-w-[10rem] max-w-[30rem] flex-[1.2] px-[2rem]`,
  accentedButton: `flex items-center justify-center text-sm bg-black text-white my-[2rem] py-[.6rem] rounded-full`,
  searchBar: `flex items-center gap-[.6rem] h-[2.6rem] border px-[1rem] rounded-full`,
  searchInput: `border-none outline-none bg-none w-full`,
  authorContainer: `my-[2rem]`,
  authorProfileImageContainer: `h-[5rem] w-[5rem] rounded-full overflow-hidden`,
  authorName: `font-semibold mb-[.2rem] mt-[1rem]`,
  authorFollowing: `text-[#787878]`,
  authorActions: `flex gap-[.6rem] my-[1rem]`,
  actionButton: `bg-[#1A8917] text-white rounded-full px-[.6rem] py-[.4rem] text-sm`,
  recommendationContainer: ``,
  title: `my-[1rem] font-bold text-xl`,
  articlesContainer: ``,
  articleContentWrapper: `flex items-center justify-between cursor-pointer my-[1rem]`,
  articleContent: `flex-[4]`,
  recommendationAuthorContainer: `flex items-center gap-[.6rem]`,
  recommendationAuthorProfileImageContainer: `rounded-full overflow-hidden h-[1.4rem] w-[1.4rem]`,
  recommendationAuthorName: `text-sm`,
  recommendationTitle: ``,
  recommendationThumbnailContainer: `flex flex-1 items-center justify-center h-[4rem] w-[4rem]`,
  recommendationThumbnail: `object-cover`,
};

const Recommendations = ({ author, filteredPosts, post }) => {
  const { currentUser } = useContext(WisdomWeaveContext);

  const authorPosts = filteredPosts.filter(
    (post) => post.data.authorEmail === author.data?.email
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.authorContainer}>
        <div className={styles.authorProfileImageContainer}>
          <Image
            src={`https://res.cloudinary.com/dcq1kcego/image/fetch/${author.data?.imageURL}`}
            height={100}
            width={100}
            alt="authorImg"
          />
        </div>
        <div className={styles.authorName}>{author.data?.name}</div>
        {/* <div className={styles.authorFollowing}>
          {author.data?.followerCount} Followers
        </div> */}
        {/* <div className={styles.authorActions}>
          <button className={styles.actionButton}>Follow</button>
          <button className={styles.actionButton}>
            <MdMarkEmailUnread />
        `  </button>
        </div> */}
      </div>

      <div className={styles.recommendationContainer}>
        {authorPosts.length === 0 ? null : (
          <div>
            <div className={styles.title}>More from {author.data?.name}</div>
            <div className={styles.articlesContainer}>
              {authorPosts.map((post) => (
                <div className={styles.articleContentWrapper} key={post.id}>
                  <div className={styles.articleContent}>
                    <div className={styles.recommendationAuthorContainer}>
                      <div
                        className={
                          styles.recommendationAuthorProfileImageContainer
                        }
                      >
                        <Image
                          src={`https://res.cloudinary.com/dcq1kcego/image/fetch/${author.data?.imageURL}`}
                          alt="author image"
                          height={100}
                          width={100}
                        />
                      </div>
                      <div className={styles.recommendationAuthorName}>
                        {author.data?.name}
                      </div>
                    </div>
                    <Link href={`/post/${post.id}`} as={`/post/${post.id}`}>
                      <div className={styles.recommendationTitle}>
                        {post.data.title}
                      </div>
                    </Link>
                  </div>
                  <div className={styles.recommendationThumbnailContainer}>
                    <Image
                      src={`https://res.cloudinary.com/dcq1kcego/image/fetch/${post.data.bannerImage}`}
                      height={100}
                      width={100}
                      alt="thumbnail"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className={styles.commentsContainer}>
          <div className={styles.title}>Comments</div>
          <Comment postId={post.id} currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};

export default Recommendations;

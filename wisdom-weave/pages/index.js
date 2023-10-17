import Header from "../components/Header";
import Banner from "../components/Banner";
import PostCard from "../components/PostCard";
import { useContext } from "react";
import { WisdomWeaveContext } from "../context/WisdomWeaveContext";

const styles = {
  postsList:
    "flex flex-col gap-3 p-2 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3",
  container: "max-w-7xl flex-1",
  main: "flex justify-center ml-20",
  accentedButton:
    "bg-[#10368E] text-white py-2 px-5 rounded-full justify-center",
  readMoreContainer: "flex justify-center items-center max-w-2xl pb-[2rem]"
};

const alertMessageStyle = {
  display: "block",
  backgroundColor: "red",
  color: "white",
  padding: "10px",
  borderRadius: "5px",
  margin: "10px 0",
};

const MAX_POSTS_TO_DISPLAY = 3;

export default function Home() {
  const {
    users,
    posts,
    searchQuery,
    searchError,
    setSearchError,
    currentUser,
    handleUserAuth,
  } = useContext(WisdomWeaveContext);

  const filteredPosts = posts.filter((post) => {
    const postText = post.data.title + post.data.brief + post.data.category;
    return postText.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (searchQuery !== "" && filteredPosts.length === 0) {
    setSearchError("No matching posts found");
  } else {
    setSearchError("");
  }

  let displayedPosts = filteredPosts;

  if (!currentUser) {
    displayedPosts = displayedPosts.slice(0, MAX_POSTS_TO_DISPLAY);
  }

  return (
    <div className={styles.wrapper}>
      <Header />
      {currentUser ? null : <Banner />}
      <div className={styles.main}>
        <div className={styles.container}>
          {searchError && (
            <div style={alertMessageStyle}>
              <p>{searchError}</p>
            </div>
          )}
          <div className={styles.postsList}>
            {displayedPosts.map((post) => (
              <PostCard post={post} key={post.id} />
            ))}
          </div>
          {currentUser ? null : (
            <div className={styles.readMoreContainer}>
              <button className={styles.accentedButton} onClick={handleUserAuth}>Read More</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

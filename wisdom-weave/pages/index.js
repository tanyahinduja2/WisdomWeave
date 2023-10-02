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
};

export default function Home() {
  const { users } = useContext(WisdomWeaveContext);
  const { posts } = useContext(WisdomWeaveContext);
  
  return (
    <div className={styles.wrapper}>
      <Header />
      <Banner />
      <div className={styles.main}>
        <div className={styles.container}>
          <div className={styles.postsList}>
            {posts.map(post => (
              <PostCard post={post} key={post.id}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useContext, useEffect, useState } from "react";
import { WisdomWeaveContext } from "../context/WisdomWeaveContext";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Header from "../components/Header";
import { doc, deleteDoc } from "firebase/firestore";
import Image from "next/image";
import { BiUnderline } from "react-icons/bi";

const styles = {
  customUnderline: {
    borderBottom: "2px solid black", // Increase the border thickness
    paddingBottom: "5px", // Add some space below the text
  },
};



const handleDeletePost = async (postId) => {
  console.log(postId);
  try {
    await deleteDoc(doc(db, "articles", postId));
    setUserPosts(userPosts.filter((post) => post.id !== postId));
  } catch (error) {
    console.error("Error deleting post:", error);
  }
};

const handleDeleteComment = async (commentId) => {
  try {
    await deleteDoc(doc(db, "comments", commentId));
    setUserComments((comments) =>
      comments.filter((comment) => comment.id !== commentId)
    );
  } catch (error) {
    console.error("Error deleting comment:", error);
  }
};

const UserActivity = () => {
  const { currentUser } = useContext(WisdomWeaveContext);
  const [userPosts, setUserPosts] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      const fetchUserPosts = async () => {
        try {
          const postsRef = collection(db, "articles");
          const postsQuery = query(
            postsRef,
            where("authorEmail", "==", currentUser.email)
          );
          const postsSnapshot = await getDocs(postsQuery);
          const posts = [];

          postsSnapshot.forEach((doc) => {
            posts.push(doc);
          });

          setUserPosts(posts);
        } catch (error) {
          console.error("Error fetching user posts:", error);
        }
      };

      const fetchUserComments = async () => {
        try {
          const commentsRef = collection(db, "comments");
          const commentsQuery = query(
            commentsRef,
            where("userId", "==", currentUser.email)
          );
          const commentsSnapshot = await getDocs(commentsQuery);
          const comments = [];

          commentsSnapshot.forEach((doc) => {
            comments.push(doc);
          });

          setUserComments(comments);
        } catch (error) {
          console.error("Error fetching user comments:", error);
        }
      };

      Promise.all([fetchUserPosts(), fetchUserComments()])
        .then(() => {
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error in Promise.all:", error);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [currentUser]);

  return (
    <div>
      <Header />
      <h1 className={`text-4xl font-semibold m-8 ${styles.customUnderline}`}>User Activity</h1>

      {isLoading && <div>Loading...</div>}

      {!isLoading && currentUser ? (
        <div className="flex justify-space-between gap-[4rem]">
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold m-8">
              Posts Authored by {currentUser.displayName}
            </h2>
            <ul>
              {userPosts.map((post) => (
                <div key={post.id} className="border p-4 m-8">
                  <p className="text-lg">{post.data().title}</p>
                  <div className="mt-2">
                    <Image
                      src={`https://res.cloudinary.com/dcq1kcego/image/fetch/${
                        post.data().bannerImage
                      }`}
                      height={100}
                      width={100}
                      alt="thumbnail"
                    />
                  </div>
                  {currentUser && (
                    <button
                      className="bg-blue-500 text-white py-2 px-10 rounded mt-2"
                      onClick={() => {
                        handleDeletePost(post.id);
                      }}
                    >
                      Delete Post
                    </button>
                  )}
                </div>
              ))}
            </ul>
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-semibold m-4">
              Comments Made by {currentUser.displayName}
            </h2>
            <ul>
              {userComments.map((comment) => (
                <div key={comment.id} className="border p-4 m-4">
                  <p className="text-lg">{comment.data().text}</p>
                  {currentUser && (
                    <button
                      className="bg-blue-500 text-white  font-semi-bold py-2 px-4 rounded mt-2"
                      onClick={() => {
                        console.log("comment:", comment.id);
                        handleDeleteComment(comment.id);
                      }}
                    >
                      Delete Comment
                    </button>
                  )}
                </div>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div>Please log in to view your user activity.</div>
      )}
    </div>
  );
};

export default UserActivity;
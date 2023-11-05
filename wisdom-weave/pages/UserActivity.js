import React, { useContext, useEffect, useState } from "react";
import { WisdomWeaveContext } from "../context/WisdomWeaveContext";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Header from "../components/Header";
import { doc, deleteDoc } from "firebase/firestore";

const handleDeletePost = async (postId) => {
  try {
    await deleteDoc(doc(db, "posts", postId));
    // Update the userPosts state to remove the deleted post
    setUserPosts(userPosts.filter((post) => post.id !== postId));
  } catch (error) {
    console.error("Error deleting post:", error);
  }
};

const handleDeleteComment = async (commentId) => {
  try {
    await deleteDoc(doc(db, "comments", commentId));
    // Update the userComments state to remove the deleted comment
    setUserComments(userComments.filter((comment) => comment.id !== commentId));
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
            posts.push(doc.data());
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
            comments.push(doc.data());
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
      <h1>User Activity</h1>

      {isLoading && <div>Loading...</div>}

      {!isLoading && currentUser ? (
        <div>
          <h2>Posts Authored by {currentUser.displayName}</h2>
          <ul>
            {userPosts.map((post) => (
              <div key={post.id}>
                <p>{post.title}</p>
                {currentUser && (
                  <button onClick={() => handleDeletePost(post.id)}>
                    Delete Post
                  </button>
                )}
              </div>
            ))}
          </ul>

          <h2>Comments Made by {currentUser.displayName}</h2>
          <ul>
            {userComments.map((comment) => (
              <div key={comment.id}>
                <p>{comment.text}</p>
                {currentUser && (
                  <button onClick={() => handleDeleteComment(comment.id)}>
                    Delete Comment
                  </button>
                )}
              </div>
            ))}
          </ul>
        </div>
      ) : (
        <div>Please log in to view your user activity.</div>
      )}
    </div>
  );
};

export default UserActivity;

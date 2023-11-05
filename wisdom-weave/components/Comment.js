import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

const styles = {
    addComment: `w-full h-[2rem] px-[0.5rem] pt-[0.2rem]`,
    accentedButton: `bg-black text-white py-1 px-3 rounded-full text-sm mb-[2rem]`,
}

const Comment = ({ postId, currentUser }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  console.log(postId)

  useEffect(() => {
    const fetchComments = async () => {
      if (postId) { 
        const commentsRef = collection(db, "comments");
        const postCommentsQuery = query(
          commentsRef,
          where("postId", "==", postId),
          orderBy("timestamp", "desc")
        );
  
        const querySnapshot = await getDocs(postCommentsQuery);
        const commentsData = [];
  
        querySnapshot.forEach((doc) => {
          commentsData.push({
            id: doc.id,
            data: doc.data(),
          });
        });
  
        setComments(commentsData);
      }
    };
  
    fetchComments();
  }, [postId]);
  

  const handleCommentSubmit = async () => {
    if (!newComment) return;

    const commentData = {
      postId,
      text: newComment,
      userId: currentUser.email,
      timestamp: serverTimestamp(),
    };

    const commentRef = await addDoc(collection(db, "comments"), commentData);
    const comment = {
      id: commentRef.id,
      data: commentData,
    };

    setComments([comment, ...comments]);
    setNewComment("");
  };

  return (
    <div>
        {currentUser ? (
          <div>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className={styles.addComment}
            />
            <button onClick={handleCommentSubmit} className={styles.accentedButton}>Submit</button>
          </div>
        ) : null }
      {comments.map((comment) => (
        <div key={comment.id} className="py-[0.2rem]">
          <span className="user-id font-semibold text-xs">{comment.data.userId}<br></br></span>
          <span>{comment.data.text}</span>
        </div>
      ))}
    </div>
  );
};

export default Comment;

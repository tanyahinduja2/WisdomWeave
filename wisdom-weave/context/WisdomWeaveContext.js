import { db, auth, provider } from "../firebase";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";

const WisdomWeaveContext = createContext();

const WisdomWeaveProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchError, setSearchError] = useState("");

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    const getUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));

      setUsers(
        querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            data: {
              ...doc.data(),
            },
          };
        })
      );
    };
    getUsers();
  }, [currentUser]);

  useEffect(() => {
    const getPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "articles"));

      setPosts(
        querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            data: {
              body: doc.data().body,
              brief: doc.data().brief,
              category: doc.data().category,
              postLength: doc.data().postLength,
              bannerImage: doc.data().bannerImage,
              title: doc.data().title,
              // comments: doc.data().comments,
              postedOn: doc.data().postedOn.toDate(),
              authorEmail: doc.data().authorEmail,
              authorName: doc.data().authorName,
            },
          };
        })
      );
    };
    getPosts();
  }, []);

  const addUserToFirebase = async (user) => {
    await setDoc(doc(db, "users", user.email), {
      email: user.email,
      name: user.displayName,
      imageURL: user.photoURL,
      followerCount: 0,
    });
  };

  const handleUserAuth = async () => {
    signInWithPopup(auth, provider)
      .then((userData) => {
        const user = userData.user;

        setCurrentUser(user);
        addUserToFirebase(user);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        setCurrentUser(null);
        console.log("Logged out");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  return (
    <WisdomWeaveContext.Provider
      value={{
        posts,
        users,
        handleUserAuth,
        currentUser,
        handleLogout,
        searchQuery,
        setSearchQuery,
        searchError,
        setSearchError,
      }}
    >
      {children}
    </WisdomWeaveContext.Provider>
  );
};

export { WisdomWeaveContext, WisdomWeaveProvider };

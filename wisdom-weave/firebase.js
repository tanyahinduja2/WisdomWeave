import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBGpTH53bSM0Rag_FW48DGfona-IRjtKKU",
  authDomain: "wisdom-weave.firebaseapp.com",
  projectId: "wisdom-weave",
  storageBucket: "wisdom-weave.appspot.com",
  messagingSenderId: "628258575670",
  appId: "1:628258575670:web:2e275f137f3312755ecf97"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
const db = getFirestore(app)

export { auth, provider, db }
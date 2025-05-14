// firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBtK0Jf5CIXA6YRTvPuzFxdVdVHjzTt1r0",
  authDomain: "wildnect.firebaseapp.com",
  projectId: "wildnect",
  storageBucket: "wildnect.firebasestorage.app",
  messagingSenderId: "377866370390",
  appId: "1:377866370390:web:92f5780df6e5222c01eaf7",
  measurementId: "G-T3JVK53TQH",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
// export const db = getFirestore(app);
//  const storage = getStorage(app);

export { auth, provider, signInWithPopup, signOut };

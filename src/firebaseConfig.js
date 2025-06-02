import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-u6evAq8fvJjwZRsj8qTfs0vQ982ZAEo",
  authDomain: "devprofile-lite-f1e7a.firebaseapp.com",
  projectId: "devprofile-lite-f1e7a",
  storageBucket: "devprofile-lite-f1e7a.firebasestorage.app",
  messagingSenderId: "961128707768",
  appId: "1:961128707768:web:4b3b673e4e38022dcf264d",
  measurementId: "G-L0CC66Z4H1"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, analytics };
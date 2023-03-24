import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDuqTPTJpE2ChBfow3m7Bvq31AJANSD3Uw",
  authDomain: "react-chat-tdv.firebaseapp.com",
  projectId: "react-chat-tdv",
  storageBucket: "react-chat-tdv.appspot.com",
  messagingSenderId: "700892868808",
  appId: "1:700892868808:web:d76fc8ec4965aa6ac9b5fd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);

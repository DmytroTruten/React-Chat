import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBh2He9dVcF5IzPA_rNvNTxeWFVBx4c3eg",
  authDomain: "react-chat-84633.firebaseapp.com",
  projectId: "react-chat-84633",
  storageBucket: "react-chat-84633.appspot.com",
  messagingSenderId: "973575152003",
  appId: "1:973575152003:web:a7fbd4f3cc6b31958e96b6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-D5HoErxAPw9UT7PzWVKkKDhYJxpAuig",
  authDomain: "fibertimereports.firebaseapp.com",
  projectId: "fibertimereports",
  storageBucket: "fibertimereports.appspot.com",
  messagingSenderId: "563191066577",
  appId: "1:563191066577:web:9b08f55b5e8822b9a23af0",
  measurementId: "G-4FR5K2WF4D"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

export default app;

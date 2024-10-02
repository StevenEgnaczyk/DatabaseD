// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAvfUTGT2fa9SvlwW7i8I35-gthphnNz_4",
  authDomain: "databased-d255f.firebaseapp.com",
  projectId: "databased-d255f",
  storageBucket: "databased-d255f.appspot.com",
  messagingSenderId: "608800540836",
  appId: "1:608800540836:web:f5f6b9b1aac575ff643e31",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
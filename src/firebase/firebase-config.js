import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD7wD0opxKtud3qFB6UF33YX9UahgQ32Zw",
  authDomain: "monkey-blogging-18d08.firebaseapp.com",
  projectId: "monkey-blogging-18d08",
  storageBucket: "monkey-blogging-18d08.appspot.com",
  messagingSenderId: "642738070362",
  appId: "1:642738070362:web:f09ba06216597f33404963",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

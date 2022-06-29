// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_VmRzHy4R_XWqRA4JUQhPZtHdGax3REo",
  authDomain: "chatapp-b1244.firebaseapp.com",
  projectId: "chatapp-b1244",
  storageBucket: "chatapp-b1244.appspot.com",
  messagingSenderId: "1059564144071",
  appId: "1:1059564144071:web:b39815eae9b134832c05e2",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);

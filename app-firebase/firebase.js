// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtVJLFsucKgvnWkMvA3-lLYumsKxi-NV8",
  authDomain: "chatapp-b1fe0.firebaseapp.com",
  projectId: "chatapp-b1fe0",
  storageBucket: "chatapp-b1fe0.appspot.com",
  messagingSenderId: "370082511330",
  appId: "1:370082511330:web:6751394838091ffc8e21bb",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);

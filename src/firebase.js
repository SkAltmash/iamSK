import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyATOZH6817pXrOGD_Iub_sE9q16FwXOWWY",
    authDomain: "iamsk-e6d48.firebaseapp.com",
    projectId: "iamsk-e6d48",
    storageBucket: "iamsk-e6d48.firebasestorage.app",
    messagingSenderId: "34900159047",
    appId: "1:34900159047:web:f492bac90fd11a44721f62",
    measurementId: "G-SBPVQFQKRT",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;

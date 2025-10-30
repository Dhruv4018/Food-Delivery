// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "gold-food-c574b.firebaseapp.com",
  projectId: "gold-food-c574b",
  storageBucket: "gold-food-c574b.firebasestorage.app",
  messagingSenderId: "335885566713",
  appId: "1:335885566713:web:c0f24b4cba1556b93d1828"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
export {app,auth}
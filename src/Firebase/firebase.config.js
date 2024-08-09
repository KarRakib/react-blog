// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey = "AIzaSyD9Uq2HdwnZnjCYfdbdgK6HGLsnyumvPso",
  authDomain: import.meta.env.VITE_authDomain = "blog-app-eaeef.firebaseapp.com",
  projectId: import.meta.env.VITE_projectId = "blog-app-eaeef",
  storageBucket: import.meta.env.VITE_storageBucket = "blog-app-eaeef.appspot.com",
  messagingSenderId: import.meta.env.VITE_messagingSenderId = "734758947842",
  appId: import.meta.env.VITE_appId = "1:734758947842:web:2bb508642807b71daf2b1b",
  measurementId: import.meta.env.VITE_measurementId = "G-V3QK53B8W9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export { auth, app };
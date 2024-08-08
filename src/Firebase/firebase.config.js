// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9Uq2HdwnZnjCYfdbdgK6HGLsnyumvPso",
  authDomain: "blog-app-eaeef.firebaseapp.com",
  projectId: "blog-app-eaeef",
  storageBucket: "blog-app-eaeef.appspot.com",
  messagingSenderId: "734758947842",
  appId: "1:734758947842:web:2bb508642807b71daf2b1b",
  measurementId: "G-V3QK53B8W9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export {auth, app};
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYgIiISPGQ6rSvfpcAg6zt4PwQgUARyuM",
  authDomain: "aspire-rolebasedaccess.firebaseapp.com",
  projectId: "aspire-rolebasedaccess",
  storageBucket: "aspire-rolebasedaccess.firebasestorage.app",
  messagingSenderId: "164761352649",
  appId: "1:164761352649:web:66f3b9395166a4be331018",
  measurementId: "G-D9FB4YZBS0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export Firebase Authentication and Firestore services
const auth = app.auth();
const db = app.firestore();

export { auth, db };

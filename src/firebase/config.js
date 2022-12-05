// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA82aHjnO0AN0T47M1khsouuN30zduK-Pw",
  authDomain: "calendar-income.firebaseapp.com",
  projectId: "calendar-income",
  storageBucket: "calendar-income.appspot.com",
  messagingSenderId: "607051044024",
  appId: "1:607051044024:web:0684b433c3ec3aff32d04d"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_1,
  authDomain: process.env.REACT_APP_2,
  projectId: process.env.REACT_APP_3,
  storageBucket: process.env.REACT_APP_4,
  messagingSenderId: process.env.REACT_APP_5,
  appId: process.env.REACT_APP_6
};

// Initialize Firebase
const fireapp = initializeApp(firebaseConfig);

export default fireapp;
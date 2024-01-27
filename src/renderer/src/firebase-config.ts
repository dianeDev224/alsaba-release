// @ts-nocheck
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// import {Creat}

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAC29L9X5SbkSPPTommW2rLJ2zh_IgbUHg",
  authDomain: "alsaba-group.firebaseapp.com",
  databaseURL: "https://alsaba-group-default-rtdb.firebaseio.com",
  projectId: "alsaba-group",
  storageBucket: "alsaba-group.appspot.com",
  messagingSenderId: "701877942431",
  appId: "1:701877942431:web:86d6100888aa781278caaa",
  measurementId: "G-96QNR3RM5E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app) ; 
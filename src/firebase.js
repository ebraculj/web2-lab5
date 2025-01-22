// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPUxrxCtQEZMXOgO2ot-9ZPxq2l3uV6-M",
  authDomain: "lab5-125a5.firebaseapp.com",
  projectId: "lab5-125a5",
  storageBucket: "lab5-125a5.firebasestorage.app",
  messagingSenderId: "75629436287",
  appId: "1:75629436287:web:6779b47fd34867ffe4ce4a",
  measurementId: "G-7HK6GNK10D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//const analytics = getAnalytics(app);

export{db};
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCPUxrxCtQEZMXOgO2ot-9ZPxq2l3uV6-M",
  authDomain: "lab5-125a5.firebaseapp.com",
  projectId: "lab5-125a5",
  storageBucket: "lab5-125a5.firebasestorage.app",
  messagingSenderId: "75629436287",
  appId: "1:75629436287:web:6779b47fd34867ffe4ce4a",
  measurementId: "G-7HK6GNK10D"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export{db};
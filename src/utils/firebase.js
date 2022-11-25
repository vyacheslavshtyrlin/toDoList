// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import 'firebase/storage';  


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdcx6G-JSxbzpmbNVsolva-1c4Z_IXDxo",
  authDomain: "todolistproject-3edcb.firebaseapp.com",
  projectId: "todolistproject-3edcb",
  storageBucket: "todolistproject-3edcb.appspot.com",
  messagingSenderId: "191402553733",
  appId: "1:191402553733:web:ad78f2e2affa92fdbb54ec",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app); 



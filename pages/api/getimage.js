// firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC6mYjCqZh7CHAbCEfgIcsUYqqVsvpZmu4",
  authDomain: "seniorproject-aa900.firebaseapp.com",
  databaseURL: "https://seniorproject-aa900-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "seniorproject-aa900",
  storageBucket: "seniorproject-aa900.appspot.com",
  messagingSenderId: "1027062073251",
  appId: "1:1027062073251:web:573512c6ff70a9ab49fc16",
  measurementId: "G-9LPS2Q36RR"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const database = getDatabase(app);



export { storage , database};

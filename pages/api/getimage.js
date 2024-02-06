// firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  // Your Firebase configuration
  apiKey: "AIzaSyC6mYjCqZh7CHAbCEfgIcsUYqqVsvpZmu4",
  authDomain: "seniorproject-aa900.firebaseapp.com",
  projectId: "seniorproject-aa900",
  storageBucket: "seniorproject-aa900.appspot.com",
  messagingSenderId: "1027062073251",
  appId: "1:1027062073251:web:3400e63e1c88269c49fc16",
  measurementId: "G-GLHF1NZE03"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };

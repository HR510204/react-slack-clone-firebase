import { initializeApp } from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDhPO-S-JSQBFpuCMu4i1wd_OzVmNL2WqY",
  authDomain: "react-slack-clone-ac98f.firebaseapp.com",
  databaseURL: "https://react-slack-clone-ac98f-default-rtdb.firebaseio.com",
  projectId: "react-slack-clone-ac98f",
  storageBucket: "react-slack-clone-ac98f.appspot.com",
  messagingSenderId: "201037298377",
  appId: "1:201037298377:web:778cc77fc83d0f1fa72b18",
  measurementId: "G-Y78MJ5B3WT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;

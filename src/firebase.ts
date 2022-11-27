import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyDlg_0o0RodmXkjWjAQtxKCGFuhIkRBTFA",
  authDomain: "todo-list-e3f74.firebaseapp.com",
  projectId: "todo-list-e3f74",
  storageBucket: "todo-list-e3f74.appspot.com",
  messagingSenderId: "539933669911",
  appId: "1:539933669911:web:5268c9ad5a00e10d85ba52"
};

const app = initializeApp(config);
const db = getFirestore(app);

export { db };

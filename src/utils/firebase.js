// Import the functions you need from the SDKs you need
import { useState, useEffect, useContext, createContext } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  browserSessionPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/auth";
import "firebase/firestore";

// import firebase from "firebase/app"
// import "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
  apiKey: "AIzaSyAat3Sn5HOwKiOtKPy2K6TFPIGnIgVwQb8",
  authDomain: "academy-b05f8.firebaseapp.com",
  databaseURL: "https://academy-b05f8.firebaseio.com",
  projectId: "academy-b05f8",
  storageBucket: "academy-b05f8.appspot.com",
  messagingSenderId: "500845312315",
  appId: "1:500845312315:web:b7d22b0d2c74e5a4031f1e",
  measurementId: "G-NZVDWTQ013",
};

const firebaseApp = initializeApp(config);
export const auth = getAuth();
// export const db = firebaseApp.firestore();
export const firestore = getFirestore(firebaseApp);

export default firebaseApp;

// // Initialize Firebase
// const firebaseApp = initializeApp(config);
// const auth = getAuth();
// const firestore = getFirestore(firebaseApp);
// const storage = getStorage(firebaseApp);

// const firebaseConfig = {
//   auth,
//   firestore,
//   storage,
// };

// // const subscribeToAuthChanges = (handleAuthChange) => {
// //   auth.onAuthStateChanged((user) => {
// //     handleAuthChange(user);
// //   });
// // };

// export const AuthContext = createContext();

// export const AuthContextProvider = (props) => {
//   const [user, setUser] = useState();
//   const [error, setError] = useState();
//   console.log("auth", auth);
//   console.log("user1", user);
//   useEffect(() => {
//     // console.log("??????????????", auth.currentUser);
//     const unsubscribe = onAuthStateChanged(auth, setUser, setError);
//     console.log("user2", user);
//     return () => unsubscribe();
//   }, []);

//   return <AuthContext.Provider value={{ user, error }} {...props} />;
// };

// export const useAuthState = () => {
//   const authContext = useContext(AuthContext);
//   console.log("auth", authContext);

//   return { ...authContext, isAuthenticated: test.user != null };
// };

// export default firebaseConfig;

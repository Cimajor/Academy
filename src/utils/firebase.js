// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


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
export const firestore = getFirestore(firebaseApp);

export default firebaseApp;

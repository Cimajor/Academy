import firebase from "./firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getAuth } from "firebase/auth";

const auth = firebase.auth;

const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const subscribeToAuthChanges = (handleAuthChange) => {
  auth.onAuthStateChanged((user) => {
    handleAuthChange(user);
  });
};

const isAuthenticated = () => {
  const status = auth().isAuthenticated();
  return status;
};

const getAuthStatus = () => {
  const user = auth.currentUser;
  return user;
};

const FirebaaseAuthService = {
  registerUser,
  loginUser,
  subscribeToAuthChanges,
  isAuthenticated,
  getAuthStatus
};

export default FirebaaseAuthService;

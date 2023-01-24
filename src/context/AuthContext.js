// import React, { useState, createContext, useE } from "react";
// import { userData } from "./UserData";

// export const UserContext = createContext();

// export const UserContextProvider = (props) => {
//   const [data, setData] = useState(userData);

//   const [user, setUser] = useState(null);
//   FirebaaseAuthService.subscribeToAuthChanges(setUser);

//   useEffect(() => {
//     console.log(user);
//   }, [user]);

//   return <UserContext.Provider value={{ contextData: [data, setData] }}>{props.children}</UserContext.Provider>;
// };

import React, { useContext, useState, useEffect } from "react";
import { auth } from "../utils/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth,email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

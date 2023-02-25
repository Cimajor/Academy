import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({children}) {
  const { currentUser } = useAuth();
  console.log("current User", currentUser);
  // return isAdmin ? children : <Navigate to="/login" />;
  return currentUser ? children : <Navigate to="/auth-login" />;
}

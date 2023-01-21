import React, { useState, createContext, useE } from "react";
import { userData } from "./UserData";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [data, setData] = useState(userData);

  const [user, setUser] = useState(null);
  FirebaaseAuthService.subscribeToAuthChanges(setUser);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return <UserContext.Provider value={{ contextData: [data, setData] }}>{props.children}</UserContext.Provider>;
};

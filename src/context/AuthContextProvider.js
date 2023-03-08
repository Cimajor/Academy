import React from "react";

const AuthContext = React.createContext({
  roles: [],
});
AuthContext.displayName = "AuthContextContext";

const AuthDispatchContext = React.createContext({});

function userReducer(state, action) {
  switch (action.type) {
    case "SET_ROLE":
      console.log("type", action);
      return {
        ...state,
        roles: action.roles,
      };

    case "SET_USER_ID":
      console.log("type", action);
      return {
        ...state,
        uid: action.uid,
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const AuthContextProvider = ({ children }) => {
  let initialUserState = {
    roles: [],
    uid: "",
  };
  const [state, dispatch] = React.useReducer(userReducer, initialUserState);

  return (
    <AuthContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>{children}</AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
};

function useAuthContext() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
}
function useUserDispatch() {
  var context = React.useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

async function setUserRole(dispatch, roles) {
  try {
    dispatch({ type: "SET_ROLE", roles: roles });
    // dispatch({ type: 'LOGIN_SUCCESS' })
  } catch (err) {
    console.log("Can't set role");
    console.log(err);
  }
}

async function setUserId(dispatch, uid) {
  try {
    dispatch({ type: "SET_USER_ID", uid: uid });
    // dispatch({ type: 'LOGIN_SUCCESS' })
  } catch (err) {
    console.log("Can't set role");
    console.log(err);
  }
}

export { useAuthContext, AuthContextProvider, useUserDispatch, setUserRole, setUserId };

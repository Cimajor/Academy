// import React, { useState, useEffect } from "react";
// import { Route, Redirect } from "react-router-dom";
// import FirebaaseAuthService from "../utils/FireBaseAuth";
// import { getAuth } from "firebase/auth";

// // const auth = localStorage.getItem("accessToken");

// const PrivateRoute = ({ exact, component: Component, ...rest }) => {
//   const auth = getAuth();
//   const user = FirebaaseAuthService.getAuthStatus;
//   // const [user, setUser] = useState(null);
//   // let user = FirebaaseAuthService.isAuthenticated();
//   console.log("user", user);

//   return (
//     <Route
//       exact={exact ? true : false}
//       rest
//       render={(props) =>
//         user ? (
//           <>
//             {console.log("+_+_+__+_+__+_+", user)}
//             <Component {...props} {...rest}></Component>
//           </>
//         ) : (
//           <>
//             {console.log("_____________", user)}
//             <Redirect to={`${process.env.PUBLIC_URL}/auth-login`}></Redirect>
//           </>
//         )
//       }
//     ></Route>
//   );
// };

// export default PrivateRoute;

import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// export default function PrivateRoute({ component: Component, ...rest }) {
//   const { currentUser } = useAuth();

//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         console.log(currentUser);
//         return currentUser ? <Component {...props} /> : <Navigate to="/auth-login" />;
//       }}
//     ></Route>
//   );
// }

export default function PrivateRoute({children}) {
  const { currentUser } = useAuth();
  console.log("current User", currentUser);
  // return isAdmin ? children : <Navigate to="/login" />;
  return currentUser ? children : <Navigate to="/auth-login" />;
}

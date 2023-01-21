import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RedirectAs404 } from "./utils/Utils";
import PrivateRoute from "./route/PrivateRoute";

import Layout from "./layout/Index";

import Error404Classic from "./pages/error/404-classic";
import Error404Modern from "./pages/error/404-modern";
import Error504Modern from "./pages/error/504-modern";
import Error504Classic from "./pages/error/504-classic";
import LandingPage from "./pages/landing/LandingPage";

import Faq from "./pages/others/Faq";
import Terms from "./pages/others/Terms";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Success from "./pages/auth/Success";
import InvoicePrint from "./pages/pre-built/invoice/InvoicePrint";
// import FirebaaseAuthService from "./utils/FireBaseAuth";
// import { getAuth } from "firebase/auth";
// import { AuthContextProvider, useAuthState } from "./utils/firebase";
import { AuthProvider } from "./context/AuthContext";
import NewHomepage from "./pages/NewHomePage";
import ProfessionsDashboard from "./pages/pre-built/user-manage/ProfessionsDashboard";

// const auth = getAuth();
// const user = auth.currentUser;

// const AuthenticatedRoute = ({ component: C, ...props }) => {
//   const { isAuthenticated } = useAuthState();
//   console.log("__________", isAuthenticated);
//   return (
//     <Route
//       {...props}
//       render={(routeProps) => (isAuthenticated ? <C {...routeProps} /> : <Redirect to="/auth-login" />)}
//     />
//   );
// };
// const UnauthenticatedRoute = ({ component: C, ...props }) => {
//   const { isAuthenticated } = useAuthState();
//   return <Route {...props} render={(routeProps) => (!isAuthenticated ? <C {...routeProps} /> : <Redirect to="/" />)} />;
// };
const App = () => {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route element={<Layout/>}>
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/`}
                element={
                  <PrivateRoute>
                    {" "}
                    <NewHomepage />
                  </PrivateRoute>
                }
              ></Route>
            </Route>
            <Route exact path={`${process.env.PUBLIC_URL}/auth-login`} component={Login}></Route>
          </Routes>
        </AuthProvider>
      </Router>
      {/* <AuthenticatedRoute
        exact
        path={`${process.env.PUBLIC_URL}/professions`}
        component={ProfessionsDashboard}
      ></AuthenticatedRoute>
      <UnauthenticatedRoute
        exact
        path={`${process.env.PUBLIC_URL}/auth-login`}
        component={Login}
      ></UnauthenticatedRoute> */}

      {/* <Switch>

        <Route exact path={`${process.env.PUBLIC_URL}/auth-success`} component={Success}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/auth-reset`} component={ForgotPassword}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/auth-register`} component={Register}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/auth-login`} component={Login}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/landing`} component={LandingPage}></Route>


        <Route exact path={`${process.env.PUBLIC_URL}/invoice-print/:id`} component={InvoicePrint}></Route>

        <Route exact path={`${process.env.PUBLIC_URL}/auths/terms`} component={Terms}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/auths/faq`} component={Faq}></Route>

        <Route exact path={`${process.env.PUBLIC_URL}/invoice-print`} component={InvoicePrint}></Route>

        <Route exact path={`${process.env.PUBLIC_URL}/errors/404-classic`} component={Error404Classic}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/errors/504-modern`} component={Error504Modern}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/errors/404-modern`} component={Error404Modern}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/errors/504-classic`} component={Error504Classic}></Route>


        <Route component={RedirectAs404}></Route>
      </Switch> */}
    </>
  );
};
export default App;

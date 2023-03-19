import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RedirectAs404 } from "./utils/Utils";
import PrivateRoute from "./route/PrivateRoute";
import PublicRoute from "./route/PublicRoute";

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
// import FirebaaseAuthService from "./utils/FireBaseAuth";
// import { getAuth } from "firebase/auth";
// import { AuthContextProvider, useAuthState } from "./utils/firebase";
import { AuthProvider } from "./context/AuthContext";
import { AuthContextProvider } from "./context/AuthContextProvider";
import NewHomepage from "./pages/NewHomePage";
import ProfessionsDashboard from "./pages/pre-built/user-manage/ProfessionsDashboard";
import ProfessionDetails from "./pages/custom-pages/professions/profession-details/profession-details";
import SkillDetailsPage from "./pages/custom-pages/professions/skills-details/skills-details";
import Skills from "./pages/custom-pages/skills/skills";
import MainFrontend from "./pages/frontend/MainFrontend";
import UserDashboard from "./pages/custom-pages/dashboard/dahboard-main";
import SkillDetails from "./pages/frontend/Skills/Skill";

const App = () => {
  return (
    <>
      <Router>
        <AuthProvider>
          <AuthContextProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/`}
                  element={
                    <PrivateRoute>
                      {" "}
                      <UserDashboard />
                    </PrivateRoute>
                  }
                ></Route>
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/professions`}
                  element={
                    <PrivateRoute>
                      {" "}
                      <ProfessionsDashboard />
                    </PrivateRoute>
                  }
                ></Route>
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/professions/:id`}
                  element={
                    <PrivateRoute>
                      <ProfessionDetails />
                    </PrivateRoute>
                  }
                ></Route>
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/applied-profession/frontend`}
                  element={
                    <PrivateRoute>
                      <MainFrontend />
                    </PrivateRoute>
                  }
                ></Route>
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/skills`}
                  element={
                    <PrivateRoute>
                      {" "}
                      <Skills />
                    </PrivateRoute>
                  }
                ></Route>
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/frontend`}
                  element={
                    <PrivateRoute>
                      {" "}
                      <MainFrontend />
                    </PrivateRoute>
                  }
                ></Route>
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/skills/:id`}
                  element={
                    <PrivateRoute>
                      <SkillDetailsPage />
                    </PrivateRoute>
                  }
                ></Route>
                                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/skill-details/:skill`}
                  element={
                    <PrivateRoute>
                      <SkillDetails />
                    </PrivateRoute>
                  }
                ></Route>
              </Route>
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/auth-login`}
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              ></Route>
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/auth-register`}
                element={
                  <PublicRoute>
                    <Register />
                  </PublicRoute>
                }
              ></Route>
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/*`}
                element={
                  <PublicRoute>
                    <Error404Classic />
                  </PublicRoute>
                }
              ></Route>
            </Routes>
          </AuthContextProvider>
        </AuthProvider>
      </Router>
    </>
  );
};
export default App;

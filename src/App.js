import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RedirectAs404 } from "./utils/Utils";
import PrivateRoute from "./route/PrivateRoute";
import PublicRoute from "./route/PublicRoute";
import ProjectCardPage from "./pages/pre-built/projects/ProjectCard";
import ProjectListPage from "./pages/pre-built/projects/ProjectList";

import UserContactCardPage from "./pages/pre-built/user-manage/UserContactCard";
import UserDetailsPage from "./pages/pre-built/user-manage/UserDetailsRegular";
import UserListCompact from "./pages/pre-built/user-manage/UserListCompact";
import UserProfileLayout from "./pages/pre-built/user-manage/UserProfileLayout";
import KycListRegular from "./pages/pre-built/kyc-list-regular/KycListRegular";
import KycDetailsRegular from "./pages/pre-built/kyc-list-regular/kycDetailsRegular";
import TransListBasic from "./pages/pre-built/trans-list/TransListBasic";
import TransListCrypto from "./pages/pre-built/trans-list/TransListCrypto";
import ProductCard from "./pages/pre-built/products/ProductCard";
import ProductList from "./pages/pre-built/products/ProductList";
import ProductDetails from "./pages/pre-built/products/ProductDetails";
import InvoiceList from "./pages/pre-built/invoice/InvoiceList";
import InvoiceDetails from "./pages/pre-built/invoice/InvoiceDetails";
import PricingTable from "./pages/pre-built/pricing-table/PricingTable";
import Gallery from "./pages/pre-built/gallery/GalleryCard";

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
import { AuthContextProvider } from "./context/AuthContextProvider";
import NewHomepage from "./pages/NewHomePage";
import ProfessionsDashboard from "./pages/pre-built/user-manage/ProfessionsDashboard";
import ProfessionDetails from "./pages/custom-pages/professions/profession-details/profession-details";
import SkillDetailsPage from "./pages/custom-pages/professions/skills-details/skills-details";
import Skills from "./pages/custom-pages/skills/skills";
import MainFrontend from "./pages/frontend/MainFrontend";

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
                      <NewHomepage />
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
            </Routes>
          </AuthContextProvider>
        </AuthProvider>
      </Router>
    </>
  );
};
export default App;

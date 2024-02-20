/* eslint-disable react/display-name */
import React, { Suspense, lazy } from "react";

// layouts
import MainLayout from "../layouts/main";
import DashboardLayout from "../layouts/dashboard";

import AuthGuard from "../guards/AuthGuard";

// components
import LoadingScreen from "../components/LoadingScreen";

import { RouteProvider, useRouteContext } from "../contexts/RouteContext";


// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  const {state} = useRouteContext()
  const isDashboard = state.currentRoute.includes("/dashboard");

  return (
    <Suspense
      fallback={
        <div style={{ width: "100%", height: "100vh", background: "red" }}>
          <LoadingScreen
            sx={{
              ...(!isDashboard && {
                top: "30vh",
                left: 0,
                width: 1,
                zIndex: 9999,
                position: "fixed",
              }),
            }}
          />
        </div>
      }
    >
      <Component {...props} />
    </Suspense>
  );
};


export const Router = ({ children }) => {
  return <RouteProvider>{children}</RouteProvider>;
};
const DashboardWrapper = ({ children }) => {
  return (
    <AuthGuard>
      <DashboardLayout> {children}</DashboardLayout>
    </AuthGuard>
  );
};
export const Routes = () => {
  const { state } = useRouteContext();

  switch (state.currentRoute) {
    case "/":
      return (
        <MainLayout>
          {" "}
          <LandingPage />{" "}
        </MainLayout>
      );
    case "/auth/login":
      return <LazyLogin />;

    case "/auth/register":
      return <Register />;
    case "/dashboard/app":
      return (
        <DashboardWrapper>
          {" "}
          <GeneralApp />
        </DashboardWrapper>
      );
    case "/dashboard/user":
      return (
        <DashboardWrapper>
          {" "}
          <UserPage />
        </DashboardWrapper>
      );
    case "/dashboard/module/create-immgigrant":
      return (
        <DashboardWrapper>
          {" "}
          <CreateUser />
        </DashboardWrapper>
      );
    case "/dashboard/module/create-request":
      return (
        <DashboardWrapper>
          {" "}
          <ICCRequest />
        </DashboardWrapper>
      );
    case "/dashboard/module/user-profile":
      return (
        <DashboardWrapper>
          {" "}
          <UserProfile />
        </DashboardWrapper>
      );
    case "/dashboard/success":
      return (
        <DashboardWrapper>
          {" "}
          <SuccessPage />
        </DashboardWrapper>
      );
    default:
      return <NotFound />; // Handle unknown routes
  }
};

export const LazyLogin = Loadable(
  lazy(() => import("../pages/authentication/Login"))
);



// Dashboard
const GeneralApp = Loadable(
  lazy(() => import("../pages/dashboard/GeneralApp"))
);
const UserPage = Loadable(
  lazy(() => import("../pages/dashboard/UserPage"))
);
const CreateUser = Loadable(
  lazy(() => import("../pages/dashboard/UserCreate"))
);
const ICCRequest = Loadable(lazy(() => import("../pages/dashboard/ICCRequest")));
const UserProfile = Loadable(lazy(() => import("../pages/dashboard/UserProfile")));
const SuccessPage = Loadable(lazy(() => import("../pages/dashboard/SuccessPage")));


// Main
const LandingPage = Loadable(lazy(() => import("../pages/LandingPage")));
const Page500 = Loadable(lazy(() => import("../pages/Page500")));
const NotFound = Loadable(lazy(() => import("../pages/Page404")));

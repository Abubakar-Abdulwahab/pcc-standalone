import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
// hooks
import useAuth from "../hooks/useAuth";
// pages
import Login from "../pages/authentication/Login";
import { useRouteContext } from "../contexts/RouteContext";

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  const { isAuthenticated, user } = useAuth();
  const {state} = useRouteContext()
  const  pathname  = state.currentRoute
  const [requestedLocation, setRequestedLocation] = useState(null);

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }

    return <Login />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);

    // return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}

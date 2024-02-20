import React, {useEffect} from "react";
// routes
import { Routes, Router } from "./routes";
// theme
import ThemeConfig from "./theme";
// hooks
import useAuth from "./hooks/useAuth";

// components
import ScrollToTop from "./components/ScrollToTop";
import LoadingScreen from "./components/LoadingScreen";
import NotistackProvider from "./components/NotistackProvider";
import ThemePrimaryColor from "./components/ThemePrimaryColor";
import MainLayout from "./layouts/main";
import { useRouteContext } from "./contexts/RouteContext";
import  "./utils/indexdb";

// ----------------------------------------------------------------------
// VW-40165
export default function App() {
  const { isInitialized } = useAuth();


  return (
    <ThemeConfig>
      <ThemePrimaryColor>
        <NotistackProvider>
          <ScrollToTop />
          {isInitialized ? (
            <Router>
              <Routes />
             
            </Router>
          ) : (
            <LoadingScreen />
          )}
        </NotistackProvider>
      </ThemePrimaryColor>
    </ThemeConfig>
  );
}

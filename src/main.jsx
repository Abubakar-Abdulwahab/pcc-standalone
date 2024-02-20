import React from "react";

import { createRoot } from "react-dom/client";

import { HelmetProvider } from "react-helmet-async";

import { SettingsProvider } from "./contexts/SettingsContext";
import { CollapseDrawerProvider } from "./contexts/CollapseDrawerContext";

import { AuthProvider } from "./contexts/JWTContext";

import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <HelmetProvider>
    <SettingsProvider>
      <CollapseDrawerProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </CollapseDrawerProvider>
    </SettingsProvider>
  </HelmetProvider>
);

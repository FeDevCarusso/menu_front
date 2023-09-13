import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import DarkModeProvider from "./context/DarkModeContext";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import AuthProvider from "./context/AuthContext";
import GlobalStorage from "./context/GlobalStorage";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DarkModeProvider>
      <BrowserRouter>
        <AuthProvider>
          <GlobalStorage>
            <App />
          </GlobalStorage>
        </AuthProvider>
      </BrowserRouter>
    </DarkModeProvider>
  </React.StrictMode>
);

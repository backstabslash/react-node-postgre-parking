import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./components/context/authprovider";

const root = ReactDOM.createRoot(
  document.getElementById("root") //as HTMLElement
);
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);

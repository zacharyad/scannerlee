import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import router from "./Router";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);

reportWebVitals();

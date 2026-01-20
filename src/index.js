import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { RoleProvider } from "./context/RoleContext";
import { CourseProvider } from "./context/CourseContext";
import { ToastProvider } from "./context/ToastContext";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <RoleProvider>
          <CourseProvider>
            <App />
          </CourseProvider>
        </RoleProvider>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>
);



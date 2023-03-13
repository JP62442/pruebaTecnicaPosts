import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import "./css/index.css";

import { App } from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={"Conectando a la aplicación..."}>
        <App />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);

import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import "./css/normalize.css";
import "./css/index.css";

import App from "./App";

import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={"Conectando a la aplicación..."}>
        <App />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);

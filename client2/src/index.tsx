import React from "react";
import ReactDOM from "react-dom/client";
// import App from './App';
import { RouterProvider } from "react-router-dom";

import { router } from "./router";
import { Provider } from "react-redux";
import store from "./redux/store";

import "./styles/style.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

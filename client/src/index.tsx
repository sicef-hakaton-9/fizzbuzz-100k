import React from "react";
import ReactDOM from "react-dom/client";
import "./style/global.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import AppRouter from "./router/AppRouter";
import AuthenticationMiddleware from "./router/AuthenticationMiddleware";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <AuthenticationMiddleware /> */}
      <AppRouter />
    </Provider>
  </React.StrictMode>
);

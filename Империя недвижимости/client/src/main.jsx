import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import "./App.scss";

import Theme from "./components/ThemeProvider";
import "./components/ThemeProvider/Themes.scss";

import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";

import store from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <Theme>
        <App />
      </Theme>
    </Provider>
  </BrowserRouter>
);

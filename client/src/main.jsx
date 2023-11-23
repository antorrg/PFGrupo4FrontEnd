import React from "react";
import ReactDOM from "react-dom/client";
import store  from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import axios from "axios";
import App from "./App.jsx";
import "./index.css";

//axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.baseURL = "BACK_DEPLOY";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
        <App />
      </BrowserRouter>
  </Provider>
);

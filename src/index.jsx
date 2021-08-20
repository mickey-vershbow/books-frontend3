import React from "react";
import ReactDom from "react-dom";
import "./CSS/styles.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { App } from "./components/App.jsx";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AppState } from "./AppState.jsx";
// pop-up alerts
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

// optional cofiguration for pop-up alerts
const options = {
  position: "bottom center",
  timeout: 2000,
  offset: "30px",
  transition: "scale",
  color: "yellow",
};

ReactDom.render(
  <AppState>
    <Router>
      <AlertProvider template={AlertTemplate} {...options}>
        <Route path="/" component={App} />
      </AlertProvider>
    </Router>
  </AppState>,
  document.querySelector("#root")
);

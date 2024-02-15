import React from "react";
import ReactDOM from "react-dom";
import App from "./components";

import "bootstrap/dist/css/bootstrap.css";
import "normalize.css";
import "./components/landing/animate.css";
import "./assets/icons/css/ionicons.css";
import "./assets/font-awesome/css/font-awesome.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "./components/stars.scss";
import "./index.css";

import "./assets/fonts/JandaManateeBubble.ttf";
import "./assets/fonts/JandaManateeSolid.ttf";
import "./assets/fonts/TCB_____.TTF";

import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "./libs/easing.js";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
// import {registerObserver} from 'react-perf-devtool';
// registerObserver();
ReactDOM.render(
  // <React.StrictMode>
    <App />,
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

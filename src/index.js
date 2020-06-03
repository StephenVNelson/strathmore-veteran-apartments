import React from "react";
import { render } from "react-dom";
// import { BrowserRouter as Router } from "react-router-dom";
import { HashRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./components/App";
import "./index.css"
import configureStore from './redux/configureStore';
import { Provider as ReduxProvider } from 'react-redux';

const store = configureStore();
console.log("PUBLIC URL: ", `hashrouter/${process.env.PUBLIC_URL}`)
// baseName={process.env.PUBLIC_URL} not sure if I need this
render(
  <ReduxProvider store={store}>
    <Router basename={`${process.env.PUBLIC_URL}`}>
      <App />
    </Router>
  </ReduxProvider>,
  document.getElementById("app")
);

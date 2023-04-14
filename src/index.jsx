import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";


/**
 * It's creating a root element for the ReactDOM to render the app into.
 *
 * @function ReactDOM.createRoot
 * @param { HTMLElement } - Takes an HTMLElement in parameter
 * @returns { Object } root object
 */
const root = ReactDOM.createRoot(document.getElementById("root"));

/**
 * It's rendering the app into the root element.
 *
 * @function root.render
 * @param { JSX.Element } - Takes a JSX Element in parameter
 */
root.render(
  <Provider store={store}>
    <BrowserRouter basename="/">
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);

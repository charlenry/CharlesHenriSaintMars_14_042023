import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import employeesReducer from "./reducers/employeesReducer";

/**
 * Combining the reducers into one reducer.
 * In this case, there is only one reducer. But We can add easier a new one if necessary.
 *
 * @constant
 * @name rootReducer
 * @kind variable
 */
const rootReducer = combineReducers({
  employeesReducer,
});

/**
 * Creating a store with the rootReducer.
 *
 * @constant
 * @name store
 * @kind variable
 */
const store = configureStore({ reducer: rootReducer });

export default store;

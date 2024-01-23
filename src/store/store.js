import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeReducer from "./Slices/themeSlice";

const rootReducer = combineReducers({
  theme: themeReducer,
});

const store = configureStore({ reducer: rootReducer });

export default store;

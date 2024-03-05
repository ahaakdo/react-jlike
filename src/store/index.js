import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./modules/user";
import pathReducer from "./modules/path";
import billReducer from "./modules/bill";

export default configureStore({
  reducer: {
    user: userReducer,
    path: pathReducer,
    bill: billReducer
  }
})
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user";
import errorsReducer from "./features/errors";

const store = configureStore({
  reducer: {
    user: userReducer,
    errors: errorsReducer,
  },
});

export default store;

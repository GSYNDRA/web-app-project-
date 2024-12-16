import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../service/userReducer/userReducer";

export const store = configureStore({
  reducer: {
    userReducer: userReducer,
  },
});

import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../service/userReducer/userReducer";
import adminReducer from "../service/adminReducer/adminReducer";

export const store = configureStore({
  reducer: {
    userReducer: userReducer,
    adminReducer: adminReducer,
  },
});

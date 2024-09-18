import { configureStore } from "@reduxjs/toolkit";
import AuthenticationReducer from "./Features/AuthenticationSlice";
import MiscellaneousReducer from "./Features/MiscellaneousSlice";
// import adsReducer from "./Features/ADS.tsx";

export const Store = configureStore({
  reducer: {
    Authentication: AuthenticationReducer,
    Miscellaneous: MiscellaneousReducer,
    // ads: adsReducer,
  },
});

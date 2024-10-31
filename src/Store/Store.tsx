import { configureStore } from "@reduxjs/toolkit";
import AuthenticationReducer from "./Features/AuthenticationSlice";
import MiscellaneousReducer from "./Features/MiscellaneousSlice";
// import adsReducer from "./Features/ADS.tsx";
import formReducer from "@/allPages/SearchProperty/formSlice";

export const Store = configureStore({
  reducer: {
    Authentication: AuthenticationReducer,
    Miscellaneous: MiscellaneousReducer,
    form: formReducer,
    // ads: adsReducer,
  },
});

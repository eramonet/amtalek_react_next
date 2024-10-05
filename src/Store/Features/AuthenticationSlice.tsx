"use client";
import { TUser } from "@/Types/AppTypes";
import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  Authorized: null,
  userData: null,
  showLoginPopUp: false,
  registrationUserType: "",
  userProfileData: {} as TUser | null,
};

if (typeof window !== "undefined") {
  const userData = JSON.parse(localStorage.getItem("userData") as any);
  initialState = {
    ...initialState,
    Authorized: userData?.token || null,
    userData: userData || null,
  };
}

const AuthorizedSlice = createSlice({
  name: "Authorized",

  initialState,
  reducers: {
    setAuthorized: (state, action) => {
      state.Authorized = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setUserProfileData: (state, action) => {
      state.userProfileData = action.payload;
    },
    setShowLoginPopUp: (state, action) => {
      state.showLoginPopUp = action.payload;
    },
    setRegistrationUserType: (state, action) => {
      state.registrationUserType = action.payload;
    },
  },
});

export default AuthorizedSlice.reducer;
export const {
  setAuthorized,
  setUserData,
  setShowLoginPopUp,
  setRegistrationUserType,
  setUserProfileData,
} = AuthorizedSlice.actions;
export const Authorized = (state: any) => state.Authentication.Authorized;
export const userData = (state: any) => state.Authentication.userData;
export const showLoginPopUp = (state: any) => state.Authentication.showLoginPopUp;
export const registrationUserType = (state: any) => state.Authentication.registrationUserType;

export const userProfileData = (state: any) => state.Authentication.userProfileData;

// import { TUser } from "@/Types/AppTypes";
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   Authorized: (() => {
//     if (typeof window !== "undefined") {
//       const userData = localStorage.getItem("userData");
//       const parsedData = userData ? JSON.parse(userData) : {};
//       return parsedData.token || null;
//     }
//     return null;
//   })(),
//   userData: (() => {
//     if (typeof window !== "undefined") {
//       const userData = localStorage.getItem("userData");
//       return userData ? JSON.parse(userData) : {};
//     }
//     return {};
//   })(),
//   showLoginPopUp: false,
//   registrationUserType: "",
//   userProfileData: {} as TUser | null,
// };
// const AuthorizedSlice = createSlice({
//   name: "Authorized",
//   initialState,
//   reducers: {
//     setAuthorized: (state, action) => {
//       state.Authorized = action.payload;
//     },
//     setUserData: (state, action) => {
//       state.userData = action.payload;
//     },
//     setUserProfileData: (state, action) => {
//       state.userProfileData = action.payload;
//     },
//     setShowLoginPopUp: (state, action) => {
//       state.showLoginPopUp = action.payload;
//     },
//     setRegistrationUserType: (state, action) => {
//       state.registrationUserType = action.payload;
//     },
//   },
// });

// export default AuthorizedSlice.reducer;
// export const {
//   setAuthorized,
//   setUserData,
//   setShowLoginPopUp,
//   setRegistrationUserType,
//   setUserProfileData,
// } = AuthorizedSlice.actions;

// export const Authorized = (state: any) => state.Authentication.Authorized;
// export const userData = (state: any) => state.Authentication.userData;
// export const showLoginPopUp = (state: any) => state.Authentication.showLoginPopUp;
// export const registrationUserType = (state: any) => state.Authentication.registrationUserType;
// export const userProfileData = (state: any) => state.Authentication.userProfileData;

import { createSlice } from "@reduxjs/toolkit";

type TADSHome = {
  id: number;
  image: string;
  url: string;
  type: string;
  iframe: string | null;
};

type ADSState = {
  ads: TADSHome[];
};

const initialState: ADSState = {
  ads: [],
};

const adsSlice = createSlice({
  name: "ads",
  initialState,
  reducers: {
    setADSData: (state, action) => {
      state.ads = action.payload;
    },
  },
});

export const { setADSData } = adsSlice.actions;
export default adsSlice.reducer;

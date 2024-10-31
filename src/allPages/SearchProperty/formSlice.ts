import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  amenities: [],
  keyword: "",
  region: "-1",
  property_type: "",
  min_beds: "",
  min_bathes: "",
  purpose: "",
  min_area: "",
  max_area: "",
  min_price: "",
  max_price: "",
  finishing: "",
  currency: "",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateForm: (state, action) => {
      // تحديث الحالة باستخدام البيانات المستلمة من الأكشن
      return { ...state, ...action.payload };
    },
    resetForm: (state) => initialState,
  },
});

export const { updateForm, resetForm } = formSlice.actions;

export default formSlice.reducer;

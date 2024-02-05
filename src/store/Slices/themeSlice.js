import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  themeColors: "#03045e,#023e8a,#0077b6,#0096c7,#00b4d8,#48cae4,#90e0ef",
  responsiveValues: [],
  project: null,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      localStorage.setItem("theme", action.payload);
      state.themeColors = action.payload;
    },
    setResponsiveValues: (state, action) => {
      state.responsiveValues = action.payload;
    },
    setProject: (state, action) => {
      state.project = action.payload;
    },
  },
});

export default themeSlice.reducer;
export const { changeTheme, setResponsiveValues, setProject } =
  themeSlice.actions;

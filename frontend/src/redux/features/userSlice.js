import { createSlice } from "@reduxjs/toolkit";

// Load Logged In User In State

// Remember that a slice is the collection of our reducer logic and then the actions.
//And we have defined that in our single file, which is basically a single feature of our app that isuser slice.
const initialState = {
  user: null,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  initialState,
  name: "userSlice",
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
  },
});

export default userSlice.reducer;

export const { setUser, setIsAuthenticated } = userSlice.actions;

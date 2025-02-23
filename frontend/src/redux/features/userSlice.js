import { createSlice } from "@reduxjs/toolkit";

// Load Logged In User In State

// Remember that a slice is the collection of our reducer logic and then the actions.
//And we have defined that in our single file, which is basically a single feature of our app that isuser slice.
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
};

export const userSlice = createSlice({
  initialState,
  name: "userSlice",
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload; // Update authentication state
    },
    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    logoutSuccess(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
  },
});

export default userSlice.reducer;

export const { setUser, setIsAuthenticated, setLoading, logoutSuccess } =
  userSlice.actions;

import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null, // user objesi tam haliyle saklanacak
  token: "",
  loading: false,
  error: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, { payload }) => {
      state.loading = false;
      state.user = payload.user; // user objesi tam haliyle saklandı
      state.token = payload.token;
    },
    registerSuccess: (state, { payload }) => {
      state.loading = false;
      state.user = payload.user; // user objesi tam haliyle saklandı
      state.token = payload.token;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.user = null; // user objesi null olarak ayarlandı
      state.token = "";
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});
export const {
  fetchStart,
  loginSuccess,
  fetchFail,
  registerSuccess,
  logoutSuccess,
} = authSlice.actions;
export default authSlice.reducer;

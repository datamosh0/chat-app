import { createSlice } from "@reduxjs/toolkit";

const nullUser: User = {
  email: null,
  displayName: null,
  photoURL: null,
  uid: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: nullUser,
    synced: false,
  },
  reducers: {
    logout: (state: any) => {
      state.user = nullUser;
    },
    login: (state: any, action: { payload: User }) => {
      state.synced = true;
      state.user = action.payload;
    },
  },
});

export const { logout, login } = userSlice.actions;

export const selectUser = (state: { user: { user: User } }) => state.user.user;

export default userSlice.reducer;

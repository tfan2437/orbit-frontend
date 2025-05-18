import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { UserData } from "@/services/user";

const initialState: UserData = {
  uid: "",
  name: "",
  email: "",
  photo_url: "",
  subscription_tier: "",
  last_login: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeUser: (state) => {
      state.uid = "";
      state.name = "";
      state.email = "";
      state.photo_url = "";
      state.subscription_tier = "";
      state.last_login = "";
    },
    updateUser: (state, action: PayloadAction<UserData>) => {
      state.uid = action.payload.uid;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.photo_url = action.payload.photo_url;
      state.subscription_tier = action.payload.subscription_tier;
      state.last_login = action.payload.last_login;
    },
    cleanUpUser: (state) => {
      state.uid = "";
      state.name = "";
      state.email = "";
      state.photo_url = "";
      state.subscription_tier = "";
      state.last_login = "";
    },
  },
});

export const { removeUser, updateUser, cleanUpUser } = userSlice.actions;
export default userSlice.reducer;

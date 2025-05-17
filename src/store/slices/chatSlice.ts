import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ChatData {
  model: number;
  loading: boolean;
}

const initialState: ChatData = {
  model: 3,
  loading: false,
};

const userSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setModel: (state, action: PayloadAction<number>) => {
      state.model = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setModel, setLoading } = userSlice.actions;
export default userSlice.reducer;

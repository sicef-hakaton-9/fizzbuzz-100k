import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../models/user";

const initialState: { value: IUser | null } = { value: null };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.value = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;

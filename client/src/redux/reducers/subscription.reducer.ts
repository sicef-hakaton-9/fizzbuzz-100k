import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISubscription } from "../../models/subscriptions";

const initialState: { value: ISubscription | null } = { value: null };

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    selectPlan: (state, action: PayloadAction<ISubscription | null>) => {
      state.value = action.payload;
    },
  },
});

export const { selectPlan } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;

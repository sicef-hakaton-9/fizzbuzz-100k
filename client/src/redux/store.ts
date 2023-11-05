import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user.reducer";
import subscriptionReducer from "./reducers/subscription.reducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    subscription: subscriptionReducer
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;

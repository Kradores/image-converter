import { configureStore } from "@reduxjs/toolkit";
import conversionReducer from "../features/conversion/conversionSlice"

export const store = configureStore({
    reducer: {
        conversion: conversionReducer
    }
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
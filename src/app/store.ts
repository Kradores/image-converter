import { configureStore } from "@reduxjs/toolkit";
import conversionReducer from "@/features/conversion/conversionSlice"
import { conversionApiSlice } from "@/features/conversion/conversionApi";
import { listenerMiddleware } from "./listenerMiddleware";

export const store = configureStore({
    reducer: {
        conversion: conversionReducer,
        [conversionApiSlice.reducerPath]: conversionApiSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .prepend(listenerMiddleware.middleware)
            .concat(conversionApiSlice.middleware)
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
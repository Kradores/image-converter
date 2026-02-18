import { isAnyOf } from "@reduxjs/toolkit";
import { conversionApiSlice } from "./conversionApi";
import { startAppListening } from "@/app/listenerMiddleware";

startAppListening({
  matcher: isAnyOf(
    conversionApiSlice.endpoints.convertImages.matchPending,
    conversionApiSlice.endpoints.convertImages.matchFulfilled,
    conversionApiSlice.endpoints.convertImages.matchRejected
  ),
  effect: async (action, listenerApi) => {
    if (conversionApiSlice.endpoints.convertImages.matchPending(action)) {
      listenerApi.dispatch({ type: "conversion/setProcessing", payload: true });
    } else {
      listenerApi.dispatch({ type: "conversion/setProcessing", payload: false });
    }
  },
});

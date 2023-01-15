import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { decrement, increment, incrementByAmount } from "./slice";
import type { RootState } from "./index";

export const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  matcher: isAnyOf(increment, decrement, incrementByAmount),
  effect: (action, listenerApi) =>
    localStorage.setItem(
      "count",
      JSON.stringify((listenerApi.getState() as RootState).counter)
    )
});

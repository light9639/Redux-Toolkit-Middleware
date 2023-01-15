import { AnyAction, configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch as _useDispatch,
  useSelector as _useSelector
} from "react-redux";
import { listenerMiddleware } from "./middleware";
import slice from "./slice";

const counterState = JSON.parse(localStorage.getItem("count") || "null");

const store = configureStore({
  preloadedState: {
    counter: counterState === null ? { value: 0 } : counterState
  },
  reducer: {
    counter: slice
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    listenerMiddleware.middleware
  ]
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type Action = AnyAction;

export const useDispatch: () => AppDispatch = _useDispatch;

export const useSelector: TypedUseSelectorHook<RootState> = _useSelector;
export default store;

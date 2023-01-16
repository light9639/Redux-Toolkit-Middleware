import { AnyAction, configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch as _useDispatch,
  useSelector as _useSelector
} from "react-redux";
import { listenerMiddleware } from "./middleware";
import slice from "./slice";

// 로컬스토리지에서 가져오기
const counterState = JSON.parse(localStorage.getItem("count") || "null");

// 스토어 생성
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

// 타입 가져오기
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type Action = AnyAction;

// useDispatch, useSelector에 타입 추가하여 타입 설정
export const useDispatch: () => AppDispatch = _useDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = _useSelector;

// 스토어 내보내기
export default store;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 초기값 타입 만들기
interface CounterState {
  value: number;
}

// 초기값 세팅
const initialState: CounterState = { value: 0 };

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.value++;
    },
    decrement(state) {
      state.value--;
    },
    incrementByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload;
    }
  }
});

// 함수 내보내기
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// reducer 내보내기
export default counterSlice.reducer;

# :zap: Redux-Toolkit-Middleware 템플렛 페이지입니다.
:octocat: https://light9639.github.io/Redux-Toolkit-Middleware/

![light9639 github io_Redux-Toolkit-Middleware_](https://user-images.githubusercontent.com/95972251/212832435-e5a1adf1-e71c-471b-951e-569ea4380817.png)

:sparkles: Redux-Toolkit-Middleware 템플렛 페이지입니다. :sparkles:
## :tada: React 생성
- React 생성
```bash
npm create-react-app my-app
# or
yarn create react-app my-app
```

- vite를 이용하여 프로젝트를 생성하려면
```bash
npm create vite@latest
# or
yarn create vite
```
- 터미널에서 실행 후 프로젝트 이름 만든 후 React 선택, Typescirpt 선택하면 생성 완료.
## 🚝 Redux-Toolkit 설치
- Redux-Toolkit 설치 명령어
```bash
npm install redux react-redux @reduxjs/toolkit
# or
yarn add redux react-redux @reduxjs/toolkit
```

## ✒️ main.tsx, App.tsx, middleware.ts, slice.ts, index.ts 수정 및작성
### :zap: main.tsx
- `react-redux`에서 `Provider` 함수 가져온 후 store 파일 import 후 <Provider store={store}></Provider>으로 <App />을 둘러싸면 Redux-Toolkit 사용준비 완료.
```bash 
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from './store/index'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
```

### :zap: App.tsx
```bash
import { useState } from "react";
import ReactLogo from './assets/react.svg'
import { increment, decrement, incrementByAmount } from "./store/slice";
import { useSelector, useDispatch } from "./store/index";
import './App.css';

export default function App(): JSX.Element {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const [entered, setEntered] = useState("");

  return (
    <div className="App">
      <div>
        <a href="https://ko.redux.js.org/introduction/getting-started/" target="_blank">
          <img src="https://camo.githubusercontent.com/7b7f04b16cc2d2d4a32985710e4d640985337a32bbb1e60cdacede2c8a4ae57b/68747470733a2f2f63646e2e776f726c64766563746f726c6f676f2e636f6d2f6c6f676f732f72656475782e737667" className="logo" alt="Redux logo" />
        </a>
      </div>
      <h1>Redux Toolkit Middleware</h1>

      <h2>Count: {count}</h2>
      <div>
        <button onClick={() => dispatch(increment())}>Increment +1</button>
        <button onClick={() => dispatch(decrement())}>Decrement -1</button>
      </div>
      <div>
        <label>
          Increment By Amount :
          <input
            type="number"
            step={1}
            value={entered}
            onChange={(e) => setEntered(e.target.value)}
            className="Input"
          />
        </label>
        <button
          onClick={() => dispatch(incrementByAmount(parseInt(entered, 10)))}
        >
          Go
        </button>
      </div>
      <div className="card">
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <p className="read-the-docs">
          Click on the Redux logos to learn more
        </p>
      </div>
    </div>
  )
}
```

### :zap: middleware.ts
```bash
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
```

### :zap: slice.tsx
```bash
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
```

### :zap: index.tsx
```bash
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
```
## 📎 출처
- 출처 1 : <a href="https://redux-toolkit.js.org/usage/usage-with-typescript#createasyncthunk">Redux-Toolkit 홈페이지</a>
- 출처 2 : <a href="https://velog.io/@rkio/Typescript-React-Redux-toolkitft.-axios-%EB%93%B1%EB%93%B1-%ED%99%9C%EC%9A%A9">Velog 글</a>

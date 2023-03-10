# π Redux-Toolkit-Middleware ννλ  νμ΄μ§μλλ€.
:octocat: https://light9639.github.io/Redux-Toolkit-Middleware/

![light9639 github io_Redux-Toolkit-Middleware_](https://user-images.githubusercontent.com/95972251/212832435-e5a1adf1-e71c-471b-951e-569ea4380817.png)

:sparkles: Redux-Toolkit-Middleware ννλ  νμ΄μ§μλλ€. :sparkles:
## :tada: React μμ±
- React μμ±
```bash
npm create-react-app my-app
# or
yarn create react-app my-app
```

- viteλ₯Ό μ΄μ©νμ¬ νλ‘μ νΈλ₯Ό μμ±νλ €λ©΄
```bash
npm create vite@latest
# or
yarn create vite
```
- ν°λ―Έλμμ μ€ν ν νλ‘μ νΈ μ΄λ¦ λ§λ  ν React μ ν, Typescirpt μ ννλ©΄ μμ± μλ£.
## π€ Redux-Toolkit μ€μΉ
- Redux-Toolkit μ€μΉ λͺλ Ήμ΄
```bash
npm install redux react-redux @reduxjs/toolkit
# or
yarn add redux react-redux @reduxjs/toolkit
```

## βοΈ main.tsx, App.tsx, middleware.ts, slice.ts, index.ts μμ  λ°μμ±
### :zap: main.tsx
- `react-redux`μμ `Provider` ν¨μ κ°μ Έμ¨ ν `store.ts` νμΌμ `import` ν ν `<Provider store={store}></Provider>`μΌλ‘ `<App />`μ λλ¬μΈλ©΄ `Redux-Toolkit` μ¬μ©μ€λΉ μλ£.
```js
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
- `slice.ts`μμ κ°μ Έμ¨ ν¨μλ€μ μ¬μ©νμ¬ `state` κ°μ λ³κ²½μν¨λ€.
- `index.ts`μμ νμμ΄ μ μΈλ `useSelector`, `useDispatch`μ κ°μ Έμ μ¬μ©νλ€.
- `input` μ κ°μ `entered`μ ν λΉνμ¬ `input` μμ μ«μλ§νΌ κ°μ μ¦κ°μν¨λ€.
```js
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
- λ¦¬λμ€ λ―Έλ€μ¨μ΄λ₯Ό λ§λ€μ΄μ λ‘μ»¬μ€ν λ¦¬μ§ κ°μ μ²΄ν¬νμ¬ κ°μ΄ μλ€λ©΄ κ°μ Έμ€κ³ , μλ€λ©΄ μλ‘μ΄ κ°μ λΆμ¬νλ€.
```js
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
- μ΄κΈ°κ°μ μΈννκ³  νμμ μ§μ ν΄μ€λ€.
- `reducers`μ `state` λ³κ²½ ν¨μλ₯Ό μμ±ν λ€μ `counterSlice.actions`λ₯Ό ν΅ν΄ λ΄λ³΄λ΄μ μ¬μ©ν  μ μκ²λ νλ€.
```js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// μ΄κΈ°κ° νμ λ§λ€κΈ°
interface CounterState {
  value: number;
}

// μ΄κΈ°κ° μΈν
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

// ν¨μ λ΄λ³΄λ΄κΈ°
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// reducer λ΄λ³΄λ΄κΈ°
export default counterSlice.reducer;
```

### :zap: index.tsx
- `counterState` λ³μλ λ‘μ»¬μ€ν λ¦¬μ§μμ κ°μ Έμ€λ μ­ν μ νλ€.
- `configureStore`λ₯Ό μ΄μ©νμ¬ μ€ν μ΄λ₯Ό μμ±νλ€.
- `RootState`, `AppDispatch`λΌλ νμ κ°μ κ°μ Έμ΄μΌλ‘μ¨ νμμ μ§μ νλ€.
- `useDispatch`, `useSelector`μ νμ μΆκ°νμ¬ νμ μ€μ νλ€.
```js
import { AnyAction, configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch as _useDispatch,
  useSelector as _useSelector
} from "react-redux";
import { listenerMiddleware } from "./middleware";
import slice from "./slice";

// λ‘μ»¬μ€ν λ¦¬μ§μμ κ°μ Έμ€κΈ°
const counterState = JSON.parse(localStorage.getItem("count") || "null");

// μ€ν μ΄ μμ±
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

// νμ κ°μ Έμ€κΈ°
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type Action = AnyAction;

// useDispatch, useSelectorμ νμ μΆκ°νμ¬ νμ μ€μ 
export const useDispatch: () => AppDispatch = _useDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = _useSelector;

// μ€ν μ΄ λ΄λ³΄λ΄κΈ°
export default store;
```
## π μΆμ²
- μΆμ² 1 : <a href="https://redux-toolkit.js.org/usage/usage-with-typescript#createasyncthunk">Redux-Toolkit ννμ΄μ§</a>
- μΆμ² 2 : <a href="https://velog.io/@rkio/Typescript-React-Redux-toolkitft.-axios-%EB%93%B1%EB%93%B1-%ED%99%9C%EC%9A%A9">Velog κΈ</a>

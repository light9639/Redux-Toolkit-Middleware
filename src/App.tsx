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

import { useState } from "react";
import { increment, decrement, incrementByAmount } from "./store/slice";
import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "./store/index";

export default function App(): JSX.Element {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch: Dispatch = useDispatch();

  const [entered, setEntered] = useState("");

  return (
    <div className="App">
      <h1>Count: {count}</h1>
      <div>
        <button onClick={() => dispatch(increment())}>Increment +1</button>
        <button onClick={() => dispatch(decrement())}>Decrement -1</button>
      </div>
      <div>
        <label>
          Increment By Amount:
          <input
            type="number"
            step={1}
            value={entered}
            onChange={(e) => setEntered(e.target.value)}
          />
        </label>
        <button
          onClick={() => dispatch(incrementByAmount(parseInt(entered, 10)))}
        >
          Go
        </button>
      </div>
    </div>
  )
}

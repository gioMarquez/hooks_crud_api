import React from 'react'
import type { RootState } from "../../redux/store/store";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "./counterSlice";

export function Counter() {
    const count = useSelector((state: RootState) => state.counter.value)
    const dispatch = useDispatch()

    return (
        <div>
          <div className='text-2xl'>
            <button aria-label='Increment value' className='bg-green-400 rounded-3xl p-2 w-[200px]' onClick={() => dispatch(increment())}>Increment</button>
            <span className=' m-5'>{count}</span>
            <button aria-label='Decrement value' className='bg-red-400 rounded-3xl p-2 w-[200px]' onClick={() => dispatch(decrement())}>Decrement</button>
          </div>
        </div>
      )
}
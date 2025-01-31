import { useState } from 'react'

export const useCounter = (initialValue = 0) => {
    // CUSTOM HOOK UNTUK MENGHITUNG
    const [count, setCount] = useState(initialValue)

    const increment = () => setCount(prevCount => prevCount + 1);
    const decrement = () => setCount(prevCount => prevCount - 1)

    const reset = () => setCount(initialValue)

  return {count,increment,decrement,reset}
}

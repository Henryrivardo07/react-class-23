import { Button } from '@/components/ui/Button'
import React from 'react'
import styles from './CounterDisplay.module.scss'
import { useCounter } from '../useCounter'

export const CounterDisplay:React.FC = () => {
    const {count,decrement,increment,reset} = useCounter(0)
  return (
    <div>
        <h1 className={styles.title}>Counter:{count}</h1>
        <div className={styles.buttonGroup}>
            <Button onClick={increment}>Menambahkan</Button>
            <Button onClick={decrement}>Mengurangi</Button>
         <Button onClick={reset}>Reset</Button>
        </div>
    </div>
  )
}

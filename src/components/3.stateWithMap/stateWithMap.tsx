import React, { useState } from 'react';
import styles from './stateWithMap.module.scss'

interface Item {
    id:number;
    name:string;
}

export const StateWithMap:React.FC = () => {
    const [items, setItems] = useState<Item[]>
    ([
        {id:1, name: "NEW ITEM 1"},
        {id:2, name: "NEW ITEM 2"},
        {id:3, name: "NEW ITEM 3"}
    ])

    const handleAddItem = () => {

        setItems((prevItems) => [
            ...prevItems,
            {id: prevItems.length + 1, name: `New Item ${prevItems.length + 1}`}
        ])
    }
    console.log(items)

  return (
    <div className={styles.mapExample}>
        <h1>Items List</h1>
        <ul>
            {items.map((item) => (
                <li key={item.id}>{item.name}</li>
            ))}
        </ul>
        <button onClick={handleAddItem}>Add item</button>
    </div>
  )
}
import React, { useState } from 'react'
import styles from './MapState.module.scss'
import { Button } from '@/components/ui/Button'



export const MapState:React.FC = () => {
    const [userMap, setUserMap] = useState<Map<string, string>>(new Map())
    
    // kosong tapi bentukannya itu udah udah kedefined
    // STRING STRING
    // name   gmail

    const handleAddOrUpdateUser = (username:string, email:string) => {
        const newMap = new Map(userMap)
        // ditambkan dari sini si penggunannya
        newMap.set(username, email)
        setUserMap(newMap)
    }

    const handleDeleteUser = (username:string) => {
        const newMap = new Map(userMap);
        newMap.delete(username)
        setUserMap(newMap)
        
    }


  return (
    <div className={styles.container}>
        <div>
            {/* nambahin user */}
            <Button
                variant='primary' onClick={() =>
                    handleAddOrUpdateUser('Henry', 'henry@example.com')
                }
            >
                Add User Henry
            </Button>
            <Button
                variant='primary' onClick={() =>{
                    handleAddOrUpdateUser('Rivardo', 'rivardo@example.com')
                }}
            >
                Add User Rivardo
            </Button>
            <Button
                variant='primary' onClick={() =>{
                    handleAddOrUpdateUser("Windah", "windah@example.com")
                }}
            >
                Add User Windah
            </Button>
        </div>
        {/* delete user */}
        <div>
            <Button variant='danger' onClick={() => handleDeleteUser('Henry')}
            >
                Delete Henry
            </Button>
            <Button variant='danger' onClick={() =>
                handleDeleteUser('Rivardo')
            }
            >
                Delete Rivardo
            </Button>
            <Button variant='danger' onClick={() =>
                handleDeleteUser("Windah")
            }
            >
                Delete Windah
            </Button>
        </div>

        <h2>Daftar Pengguna</h2>
        <ul className={styles.userList}>
            {[...userMap.entries()].map(([username, email]) => (
                <li key={username} className={styles.userItem}>{username}: {email}</li>
            ))}
        </ul>
    </div>
  )
}

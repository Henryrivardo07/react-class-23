import React, { useEffect, useState } from 'react'
import styles from './dataFetcher.module.scss'

interface Post {
    id: number
    title: string;
    body:string;
}

export const DataFetcher: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts')
            if(!response.ok) {
                throw new Error("Network Response was not ok")
            }
            const data = await response.json()
            setPosts(data)
            } catch (err) {
                setError('failed to fetch data')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])
    // emptu array untuk menjalankan sekali saat komponen ini di mount

    if(loading) return <p>loading...</p>
    if(error) return <p>{error}</p>

  return (
    <div className={styles.containerBlog}>
        <h1>Fetching Data Post</h1>
        <ul>
            {posts.map((post) => (
                <li key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </li>
            ))}
        </ul>
    </div>
  )
}

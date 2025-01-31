import React, { useState } from 'react';
import useFetchProductsWithPagination from '@/hooks/useFetchProductsWithPagination';
import styles from './PageWithPagination.module.scss'; // Import SCSS module

const PageWithPagination = () => {
  // Menentukan halaman dan jumlah item per halaman
  const [page, setPage] = useState(1);
  const limit = 10; // Jumlah item per halaman

  // Mengambil data produk berdasarkan halaman dan jumlah item per halaman
  const { products, loading, error } = useFetchProductsWithPagination(
    page,
    limit
  );

  if (loading) return <div className={styles.container}>Loading...</div>;
  if (error) return <div className={styles.container}>{`Error: ${error}`}</div>;

  return (
    <div className={styles.container}>
      <h1>Product List</h1>
      <div className={styles.productList}>
        {products?.map((product) => (
          <div key={product.id} className={styles.productItem}>
            <img src={product.image} alt={product.title} />
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p className={styles.price}>${product.price}</p>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className={styles.pagination}>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          &larr; Prev
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage((prev) => prev + 1)}>&rarr; Next</button>
      </div>
    </div>
  );
};

export default PageWithPagination;

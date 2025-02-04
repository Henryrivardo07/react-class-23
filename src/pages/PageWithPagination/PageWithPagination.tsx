import React, { useState } from 'react';
import useFetchProductsWithPagination from '@/hooks/useFetchProductsWithPagination'; // Import custom hook untuk fetching data
import styles from './PageWithPagination.module.scss'; // Import SCSS module untuk styling

// Komponen utama untuk menampilkan daftar produk dengan pagination
const PageWithPagination: React.FC = () => {
  // State untuk menyimpan halaman saat ini
  const [page, setPage] = useState(1);
  const limit = 10; // Jumlah item yang ditampilkan per halaman

  // Memanggil custom hook untuk mengambil data produk berdasarkan halaman
  const { products, loading, error } = useFetchProductsWithPagination(
    page,
    limit
  );

  // Menampilkan loading saat data sedang di-fetch
  if (loading) return <div className={styles.container}>Loading...</div>;

  // Menampilkan error jika terjadi kesalahan saat fetching data
  if (error) return <div className={styles.container}>{`Error: ${error}`}</div>;

  return (
    <div className={styles.container}>
      <h1>Product List</h1>

      {/* List Produk */}
      <div className={styles.productList}>
        {products?.map((product) => (
          <div key={product.id} className={styles.productItem}>
            <img src={product.image} alt={product.title} />{' '}
            {/* Menampilkan gambar produk */}
            <h2>{product.title}</h2> {/* Menampilkan nama produk */}
            <p>{product.description}</p> {/* Menampilkan deskripsi produk */}
            <p className={styles.price}>${product.price}</p>{' '}
            {/* Menampilkan harga produk */}
          </div>
        ))}
      </div>

      {/* Kontrol Pagination */}
      <div className={styles.pagination}>
        {/* Tombol Prev untuk berpindah ke halaman sebelumnya, dinonaktifkan jika sudah di halaman 1 */}
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          &larr; Prev
        </button>

        {/* Menampilkan nomor halaman saat ini */}
        <span>Page {page}</span>

        {/* Tombol Next untuk berpindah ke halaman berikutnya */}
        <button onClick={() => setPage((prev) => prev + 1)}>&rarr; Next</button>
      </div>
    </div>
  );
};

// Mengekspor komponen agar bisa digunakan di tempat lain
export default PageWithPagination;

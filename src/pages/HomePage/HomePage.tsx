import React, { useCallback } from 'react'; // Import React dan useCallback
import styles from './HomePage.module.scss'; // Import styling SCSS untuk halaman utama
import { ProductCard } from '@/components/ui/CardProduct/CardProduct'; // Import komponen untuk menampilkan produk

import useFetchProducts from '@/hooks/useFetchProducts'; // Hook untuk mengambil data produk
import { useCart } from '@/Context/cartContext';
import { toast, ToastContainer } from 'react-toastify'; // Import toast untuk notifikasi
import 'react-toastify/dist/ReactToastify.css'; // Import CSS untuk toast notifications
import { Navbar } from '../Navbar/Navbar';

export const Homepage: React.FC = () => {
  // Mengambil data produk dan status loading/error dari hook useFetchProducts
  const { products, loading, error } = useFetchProducts();
  // Mengambil fungsi addToCart dari cartContext
  const { addToCart } = useCart();

  // 🛑 TANPA useCallback: handleAddToCart dibuat ulang setiap render
  // ✅ DENGAN useCallback: handleAddToCart tetap sama di setiap render
  const handleAddToCart = useCallback(
    (product: any) => {
      addToCart(product); // Menambahkan produk ke keranjang
      // Menampilkan notifikasi toast ketika produk berhasil ditambahkan ke keranjang
      toast.success(`${product.title} has been added to your cart!`, {
        position: 'top-center', // Menampilkan toast di posisi atas tengah
        autoClose: 3000, // Menutup toast otomatis setelah 3 detik
        hideProgressBar: true, // Menyembunyikan progress bar
        closeOnClick: true, // Menutup toast ketika diklik
        pauseOnHover: true, // Menjeda animasi ketika toast di-hover
      });
    },
    [addToCart]
  ); // ⚠️ Fungsi ini hanya berubah jika `addToCart` berubah

  // Jika produk masih dalam proses loading, tampilkan loading message
  if (loading) {
    return <div>Loading products...</div>;
  }

  // Jika terjadi error saat mengambil data, tampilkan pesan error
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.homepage}>
      {/* Navbar yang ada di halaman utama */}
      <Navbar />

      {/* Header halaman utama */}
      <header className={styles.header}>
        <h1>Welcome to CyberShop</h1>
        <p>The ultimate destination for your shopping needs.</p>
      </header>

      {/* Konten utama halaman */}
      <main className={styles.mainContent}>
        <h2 className={styles.sectionTitle}>Featured Products</h2>
        <div className={styles.productsGrid}>
          {/* Mapping setiap produk untuk ditampilkan dalam bentuk card */}
          {products.map((product) => (
            <ProductCard
              key={product.id} // Gunakan ID produk sebagai key
              {...product} // Spread operator untuk meneruskan semua properti produk
              onAddToCart={() => handleAddToCart(product)} // Fungsi yang dipanggil saat tombol "Add to Cart" diklik
            />
          ))}
        </div>
      </main>

      {/* Footer halaman */}
      <footer className={styles.footer}>
        <p>&copy; 2025 HENRYPEDIA. All rights reserved.</p>
      </footer>

      {/* Komponen ToastContainer untuk menampilkan notifikasi toast */}
      <ToastContainer />
    </div>
  );
};

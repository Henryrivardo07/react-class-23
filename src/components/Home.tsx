// Import React supaya bisa pakai JSX dan bikin komponen
import React from 'react';

// Import React Router untuk mengatur navigasi (pindah halaman)
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import halaman-halaman yang nanti akan ditampilkan berdasarkan URL
import { Homepage } from '@/pages/HomePage/HomePage'; // Halaman utama
import { Checkout } from '@/pages/Checkout/Checkout'; // Halaman checkout
import { SearchPage } from '@/pages/SearchPage/SearchPage'; // Halaman pencarian

// Import Context Providers (global state management)
import { CartProvider } from '@/Context/cartContext'; // Menyimpan state keranjang belanja
import { SearchProvider } from '@/Context/searchContext'; // Menyimpan state pencarian

// Import React Query untuk caching data dari API
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/queryClient'; // Konfigurasi client query

// Import halaman tambahan
import PageWithPagination from '@/pages/PageWithPagination/PageWithPagination'; // Halaman dengan fitur pagination
import ProductDetail from '@/pages/ProductDetail/ProductDetail'; // Halaman detail produk berdasarkan ID

// Membuat komponen utama Home yang mengatur semua halaman dan state global
export const Home: React.FC = () => {
  return (
    // Membungkus aplikasi dengan QueryClientProvider supaya data dari API bisa di-cache
    <QueryClientProvider client={queryClient}>
      {/* Membungkus aplikasi dengan CartProvider supaya state keranjang bisa dipakai di mana saja */}
      <CartProvider>
        {/* Membungkus aplikasi dengan SearchProvider supaya state pencarian bisa dipakai di mana saja */}
        <SearchProvider>
          {/* Router untuk mengatur navigasi di aplikasi */}
          <Router>
            {/* Daftar route (jalur navigasi) dalam aplikasi */}
            <Routes>
              {/* Jika user membuka "/", tampilkan halaman utama */}
              <Route path='/' element={<Homepage />} />
              {/* Jika user membuka "/checkout", tampilkan halaman checkout */}
              <Route path='/checkout' element={<Checkout />} />
              {/* Jika user membuka "/search", tampilkan halaman pencarian */}
              <Route path='/search' element={<SearchPage />} />
              {/* Jika user membuka "/page-pagination", tampilkan halaman dengan fitur pagination */}
              <Route path='/page-pagination' element={<PageWithPagination />} />
              {/* Jika user membuka "/products/:id", tampilkan halaman detail produk sesuai ID */}
              <Route path='/products/:id' element={<ProductDetail />} />
            </Routes>
          </Router>
        </SearchProvider>
      </CartProvider>
    </QueryClientProvider>
  );
};

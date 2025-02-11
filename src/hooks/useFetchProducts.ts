// hooks/useFetchProducts.ts

// Import useState dan useEffect dari React untuk state dan efek samping
import axios from 'axios';
import { useState, useEffect } from 'react';

// Mengambil URL API dari environment variable (VITE_API_URL)
const apiUrl = import.meta.env.VITE_API_URL;

// Import axios untuk melakukan HTTP request

// Mendefinisikan tipe data untuk product (sesuai dengan struktur API)
interface Product {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

// Custom hook untuk mengambil data produk dari API menggunakan Axios
const useFetchProductsWithAxios = () => {
  // State untuk menyimpan daftar produk yang didapat dari API
  const [products, setProducts] = useState<Product[]>([]);

  // State untuk menyimpan status loading (true saat data sedang diambil)
  const [loading, setLoading] = useState<boolean>(true);

  // State untuk menyimpan pesan error jika terjadi kesalahan saat fetch data
  const [error, setError] = useState<string>('');

  // Mengambil data produk saat komponen pertama kali dimuat
  useEffect(() => {
    // Fungsi async untuk mengambil data produk dari API
    const fetchProducts = async () => {
      try {
        // Mengambil data dari API menggunakan Axios
        const response = await axios.get(`${apiUrl}/products`);

        // Menyimpan data produk ke dalam state products
        setProducts(response.data);

        // Setelah data diterima, ubah status loading menjadi false
        setLoading(false);
      } catch (err) {
        // Jika terjadi error, simpan pesan error dan ubah loading menjadi false
        setError('Failed to fetch products.');
        setLoading(false);
      }
    };
    // Jalankan fungsi fetchProducts saat pertama kali komponen dimuat
    fetchProducts();
  }, []); // Dependency array kosong [] berarti useEffect hanya dijalankan sekali saat komponen pertama kali muncul

  // Mengembalikan state products, loading, dan error agar bisa digunakan di komponen lain
  return { products, loading, error };
};

// Mengekspor custom hook agar bisa digunakan di komponen lain
export default useFetchProductsWithAxios;

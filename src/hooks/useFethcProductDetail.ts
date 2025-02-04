// hooks/useFetchProductDetail.ts

// Mengimpor useQuery dari @tanstack/react-query untuk manajemen data fetching
import { useQuery } from '@tanstack/react-query';

// Mengambil URL API dari environment variable (misalnya di file .env)
const apiUrl = import.meta.env.VITE_API_URL;

// Mendefinisikan tipe data untuk produk agar lebih aman saat digunakan dalam TypeScript
interface Product {
  id: number; // ID unik dari produk
  title: string; // Nama produk
  price: string; // Harga produk dalam bentuk string
  category: string; // Kategori produk
  description: string; // Deskripsi produk
  image: string; // URL gambar produk
}

// Fungsi async untuk mengambil detail produk berdasarkan ID dari API
const fetchProductDetail = async (id: number): Promise<Product> => {
  // Melakukan request ke API dengan menggunakan ID produk sebagai parameter di URL
  const response = await fetch(`${apiUrl}/products/${id}`);

  // Menampilkan log di console untuk debugging
  console.log(`Fetching product detail for ID: ${id}`);

  // Jika response dari API tidak OK, lempar error agar bisa ditangani oleh React Query
  if (!response.ok) {
    throw new Error('Failed to fetch product detail');
  }

  // Mengembalikan data produk dalam format JSON
  return response.json();
};

// Custom hook untuk mengambil detail produk menggunakan useQuery
const useFetchProductDetail = (id: number) => {
  // Menggunakan useQuery untuk mengambil data produk berdasarkan ID
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['product', id], // queryKey digunakan untuk membedakan query berdasarkan ID produk
    queryFn: () => fetchProductDetail(id), // queryFn adalah fungsi yang akan dipanggil untuk fetch data
  });

  // Mengembalikan data produk, status loading, dan pesan error agar bisa digunakan di komponen lain
  return {
    product: data, // Data produk (bisa null jika belum tersedia)
    loading: isLoading, // Status loading, true jika data masih diambil
    error: isError ? error.message : '', // Jika terjadi error, tampilkan pesan error
  };
};

// Mengekspor custom hook agar bisa digunakan di komponen lain
export default useFetchProductDetail;
/*

Penjelasan utama:

React Query (useQuery) dipakai buat otomatisasi fetching data.
queryKey: ['product', id] memastikan setiap produk dengan ID unik mendapatkan cache sendiri.
Error handling otomatis: kalau request gagal, useQuery langsung menangani error tanpa perlu useState.
Logging (console.log) buat debugging biar tahu kapan request dijalankan.
*/

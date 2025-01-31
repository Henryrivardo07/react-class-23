// Mengimpor hook useQuery dari library @tanstack/react-query untuk mengambil data secara otomatis dengan manajemen state.
import { useQuery } from '@tanstack/react-query';

// Mendapatkan URL API dari environment variable yang telah disetting sebelumnya (misalnya di file .env).
const apiUrl = import.meta.env.VITE_API_URL;

// Mendefinisikan tipe data untuk produk agar dapat digunakan dalam kode TypeScript.
interface Product {
  id: number; // ID produk, bertipe angka.
  title: string; // Nama produk, bertipe string.
  price: string; // Harga produk, bertipe string.
  category: string; // Kategori produk, bertipe string.
  description: string; // Deskripsi produk, bertipe string.
  image: string; // URL gambar produk, bertipe string.
}

// Fungsi untuk mengambil data produk dari API dengan parameter pagination (page dan limit).
const fetchProducts = async (
  page: number, // Menentukan halaman yang ingin diambil.
  limit: number // Menentukan jumlah produk per halaman.
): Promise<Product[]> => {
  // Mengembalikan Promise yang berisi array produk.

  // Melakukan request ke API dengan menambahkan parameter page dan limit ke URL.
  const response = await fetch(
    `${apiUrl}/products?page=${page}&limit=${limit}`
  );

  // Menampilkan log untuk menunjukkan bahwa data sedang diambil untuk halaman tertentu.
  console.log(`Fetching products for page ${page} with limit ${limit}`);

  // Jika response dari API tidak OK, lempar error.
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  // Mengembalikan data dalam format JSON.
  return response.json();
};

// Custom hook yang menggunakan useQuery untuk mengambil data produk dengan pagination.
const useFetchProductsWithPagination = (page: number, limit: number) => {
  // Menggunakan useQuery untuk mengambil data produk dan mengelola state loading, error, dan data.
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['products', page, limit], // queryKey digunakan untuk mendefinisikan kunci query agar query ini unik.
    queryFn: () => fetchProducts(page, limit), // queryFn adalah fungsi yang akan dipanggil untuk mengambil data.
    staleTime: 1000 * 60 * 5, // Data dianggap stale setelah 5 menit.
    cacheTime: 1000 * 60 * 10, // Data akan dihapus dari cache setelah 10 menit.
  });

  // Mengembalikan data produk, status loading, dan error dari useQuery.
  return {
    products: data || [], // Jika data belum ada, kembalikan array kosong.
    loading: isLoading, // Status loading.
    error: isError ? error.message : '', // Jika terjadi error, tampilkan pesan error.
  };
};

// Mengekspor hook untuk digunakan di komponen lain.
export default useFetchProductsWithPagination;

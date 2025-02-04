// hooks/useFetchProductsWithPagination.ts

// Mengimpor hook useQuery dari @tanstack/react-query untuk mengambil data dengan manajemen state otomatis
import { useQuery } from '@tanstack/react-query';

// Mendapatkan URL API dari environment variable yang telah disetting sebelumnya (misalnya di file .env)
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

// Fungsi async untuk mengambil data produk dari API dengan pagination
const fetchProducts = async (
  page: number, // Halaman yang ingin diambil
  limit: number // Jumlah produk yang ingin diambil per halaman
): Promise<Product[]> => {
  // Mengirim request ke API dengan menambahkan parameter page dan limit pada URL
  const response = await fetch(
    `${apiUrl}/products?page=${page}&limit=${limit}`
  );

  // Menampilkan log di console untuk debugging
  console.log(`Fetching products for page ${page} with limit ${limit}`);

  // Jika response dari API tidak OK, lempar error agar bisa ditangani oleh React Query
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  // Mengembalikan data produk dalam format JSON
  return response.json();
};

// Custom hook untuk mengambil data produk menggunakan useQuery dengan pagination
const useFetchProductsWithPagination = (page: number, limit: number) => {
  // Menggunakan useQuery untuk mengambil data produk secara otomatis dan mengelola state loading, error, dan data
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['products', page, limit], // queryKey digunakan untuk membedakan query berdasarkan page dan limit
    queryFn: () => fetchProducts(page, limit), // queryFn adalah fungsi yang akan dipanggil untuk fetch data
    staleTime: 1000 * 60 * 5, // Data dianggap fresh selama 5 menit sebelum di-fetch ulang
    cacheTime: 1000 * 60 * 10, // Data akan tetap ada di cache selama 10 menit sebelum dihapus
  });

  // Mengembalikan data produk, status loading, dan pesan error agar bisa digunakan di komponen lain
  return {
    products: data || [], // Jika data belum tersedia, kembalikan array kosong agar tidak error
    loading: isLoading, // Status loading, true jika data masih diambil
    error: isError ? error.message : '', // Jika terjadi error, tampilkan pesan error
  };
};

// Mengekspor custom hook agar bisa digunakan di komponen lain
export default useFetchProductsWithPagination;
/*

Penjelasan utama:

React Query (useQuery) dipakai buat handle data fetching dengan otomatis.
queryKey membantu membedakan data berdasarkan halaman (page) dan jumlah produk (limit).
staleTime dan cacheTime mengatur kapan data harus di-refresh dan kapan dihapus dari cache.
State otomatis: isLoading, isError, dan data dari useQuery bikin manajemen state lebih simpel dibanding pakai useState + useEffect.
Kalau butuh tambahan penjelasan atau ada yang mau lo sesuaikan buat murid lo, kasih tahu aja bro! 🚀
*/

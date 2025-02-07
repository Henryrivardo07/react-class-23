import { useInfiniteQuery } from '@tanstack/react-query'; // 🔥 Import React Query untuk infinite scrolling
import axios from 'axios';

const API_URL = 'https://fakestoreapi.com/products';

/** ✅ Fungsi untuk mengambil data produk dengan pagination */
const fetchProducts = async ({ pageParam = 1 }: { pageParam?: number }) => {
  const response = await axios.get(`${API_URL}?_page=${pageParam}&_limit=10`);
  return response.data ?? []; // 🔥 Pastikan mengembalikan array, agar tidak return undefined/null
};

export const useInfiniteProducts = () => {
  /** ✅ Menggunakan useInfiniteQuery untuk fetching data */
  const {
    data, // Data hasil fetching (terbagi dalam pages)
    fetchNextPage, // Fungsi untuk mengambil halaman berikutnya
    hasNextPage, // Boolean: apakah masih ada halaman selanjutnya?
    isFetchingNextPage, // Boolean: apakah sedang mengambil halaman berikutnya?
    isLoading, // Boolean: apakah data sedang dimuat?
    error, // Jika ada error
  } = useInfiniteQuery({
    queryKey: ['products'], // 🔥 Key unik untuk cache query
    queryFn: fetchProducts, // 🔥 Fungsi pengambilan data
    initialPageParam: 1, // 🔥 Halaman awal adalah 1
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || !Array.isArray(lastPage) || lastPage.length < 10)
        return null; // 🔥 Jika data kurang dari 10 item, hentikan pagination
      return allPages.length + 1; // 🔥 Ambil halaman berikutnya berdasarkan jumlah halaman yang ada
    },
  });

  return {
    products: data?.pages?.flat() ?? [], // 🔥 Menggabungkan semua pages jadi satu array (flattening)
    fetchNextPage, // 🔥 Fungsi untuk mengambil halaman berikutnya
    hasNextPage: hasNextPage ?? false, // 🔥 Boolean apakah masih ada data?
    isFetchingNextPage, // 🔥 Apakah sedang memuat data berikutnya?
    isLoading, // 🔥 Apakah data awal sedang dimuat?
    error, // 🔥 Error jika ada
  };
};

import { useQuery } from '@tanstack/react-query';

const apiUrl = import.meta.env.VITE_API_URL;

// Mendefinisikan tipe data untuk produk
interface Product {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

// Fungsi untuk mengambil detail produk berdasarkan ID
const fetchProductDetail = async (id: number): Promise<Product> => {
  const response = await fetch(`${apiUrl}/products/${id}`);
  console.log(`Fetching product detail for ID: ${id}`); // Debugging

  if (!response.ok) {
    throw new Error('Failed to fetch product detail');
  }
  return response.json();
};

// Custom hook untuk fetching detail produk
const useFetchProductDetail = (id: number) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['product', id], // queryKey sebagai array dengan ID produk
    queryFn: () => fetchProductDetail(id), // queryFn untuk fetching data
  });

  return {
    product: data, // Data produk
    loading: isLoading, // Status loading
    error: isError ? error.message : '', // Pesan error (jika ada)
  };
};

export default useFetchProductDetail;

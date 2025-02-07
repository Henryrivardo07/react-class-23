import { useState, useEffect } from 'react';
import axios from 'axios';

// URL API untuk mengambil data produk dari FakeStoreAPI
const API_URL = 'https://fakestoreapi.com/products';

// Custom Hook untuk mengelola data produk
export const useProducts = () => {
  // State untuk menyimpan daftar produk
  const [products, setProducts] = useState<any[]>([]);
  // State untuk status loading
  const [isLoading, setIsLoading] = useState(true);
  // State untuk menangkap error
  const [error, setError] = useState(null);
  // State untuk menentukan apakah masih ada halaman selanjutnya
  const [hasNextPage, setHasNextPage] = useState(true);
  // State untuk status fetching data tambahan
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);

  // useEffect untuk memanggil data saat pertama kali component dipakai
  useEffect(() => {
    fetchProducts();
  }, []);

  // Function untuk mengambil data produk dari API
  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_URL);
      setProducts(response.data); // Simpan data produk ke state
    } catch (err: any) {
      setError(err.message); // Tangkap error jika ada
    } finally {
      setIsLoading(false); // Set loading menjadi false setelah request selesai
    }
  };

  /** ✅ Fungsi untuk menambahkan produk baru */
  const addProduct = async (newProduct: any) => {
    try {
      const response = await axios.post(API_URL, newProduct);

      // Karena FakeStoreAPI tidak benar-benar menyimpan produk baru,
      // kita menambahkannya secara manual ke dalam state
      const createdProduct = {
        id: products.length + 1, // ID manual karena API tidak menyimpan data
        ...newProduct,
      };

      setProducts([createdProduct, ...products]); // Tambahkan produk ke daftar
      return true; // Berhasil menambahkan produk
    } catch {
      return false; // Gagal menambahkan produk
    }
  };

  /** ✅ Fungsi untuk mengupdate produk berdasarkan ID */
  const updateProduct = async (id: number, updatedProduct: any) => {
    try {
      await axios.put(`${API_URL}/${id}`, updatedProduct);
      setProducts(
        products.map((product) =>
          product.id === id ? { ...product, ...updatedProduct } : product
        )
      );
      return true; // Berhasil mengupdate produk
    } catch {
      return false; // Gagal mengupdate produk
    }
  };

  /** ✅ Fungsi untuk menghapus produk berdasarkan ID */
  const deleteProduct = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProducts(products.filter((product) => product.id !== id)); // Hapus dari state
      return true; // Berhasil menghapus produk
    } catch {
      return false; // Gagal menghapus produk
    }
  };

  /** ✅ Fungsi untuk mengambil halaman produk berikutnya */
  const fetchNextPage = async () => {
    if (!hasNextPage || isFetchingNextPage) return; // Jika tidak ada halaman selanjutnya atau sedang mengambil data, hentikan proses
    setIsFetchingNextPage(true);
    try {
      const response = await axios.get(API_URL);
      setProducts([...products, ...response.data]); // Tambahkan produk baru ke daftar
    } catch {
      setHasNextPage(false); // Jika gagal, tandai bahwa tidak ada halaman berikutnya
    } finally {
      setIsFetchingNextPage(false); // Set status fetching menjadi false
    }
  };

  // Mengembalikan semua state dan fungsi yang bisa digunakan di component lain
  return {
    products, // Daftar produk
    addProduct, // Fungsi tambah produk
    updateProduct, // Fungsi update produk
    deleteProduct, // Fungsi hapus produk
    fetchNextPage, // Fungsi ambil halaman berikutnya
    hasNextPage, // Status apakah ada halaman selanjutnya
    isFetchingNextPage, // Status fetching halaman berikutnya
    isLoading, // Status loading awal
    error, // Error jika ada
  };
};

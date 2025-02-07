import React, { useState, useEffect } from 'react';
import styles from './MyStore.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navbar } from '../Navbar/Navbar';
import { useProducts } from '../../hooks/useProducts'; // 🔥 Menggunakan custom hook untuk produk

export const MyStore: React.FC = () => {
  // Mengambil state dan fungsi dari custom hook useProducts
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useProducts();

  // State untuk menyimpan data produk baru yang akan ditambahkan
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    image: '',
  });

  // State untuk menyimpan produk yang sedang diedit
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  // Jika ada produk yang sedang diedit, isi form dengan data produk tersebut
  useEffect(() => {
    if (editingProduct) {
      setNewProduct({
        title: editingProduct.title,
        price: editingProduct.price.toString(),
        image: editingProduct.image,
      });
    }
  }, [editingProduct]);

  // Jika data sedang dimuat, tampilkan pesan loading
  if (isLoading) return <p>Loading products...</p>;
  // Jika terjadi error, tampilkan pesan error
  if (error) return <p>Error loading products</p>;

  /** ✅ Handle untuk menambahkan produk */
  const handleAddProduct = async () => {
    const success = await addProduct(newProduct);
    if (success) {
      toast.success('Product added successfully!'); // Menampilkan notifikasi sukses
      setNewProduct({ title: '', price: '', image: '' }); // Reset form
    } else {
      toast.error('Failed to add product!'); // Menampilkan notifikasi error
    }
  };

  /** ✅ Handle untuk mengedit produk */
  const handleEditProduct = async () => {
    if (!editingProduct) return;

    const success = await updateProduct(editingProduct.id, newProduct);
    if (success) {
      toast.success('Product updated successfully!');
      setEditingProduct(null); // Reset state editing
      setNewProduct({ title: '', price: '', image: '' }); // Reset form
    } else {
      toast.error('Failed to update product!');
    }
  };

  /** ✅ Handle untuk menghapus produk */
  const handleDeleteProduct = async (id: number) => {
    const success = await deleteProduct(id);
    if (success) {
      toast.success('Product deleted successfully!');
    } else {
      toast.error('Failed to delete product!');
    }
  };

  return (
    <div>
      <Navbar /> {/* 🔥 Navbar */}
      <div className={styles.container}>
        <h1 className={styles.title}>My Store</h1>
        <p className={styles.subtitle}>Manage your products with ease</p>
        {/* 🔥 Form untuk menambahkan atau mengedit produk */}
        <div className={styles.formContainer}>
          <input
            type='text'
            placeholder='Product Name'
            value={newProduct.title}
            onChange={(e) =>
              setNewProduct({ ...newProduct, title: e.target.value })
            }
          />
          <input
            type='text'
            placeholder='Price'
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
          <input
            type='text'
            placeholder='Image URL'
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
          />
          {editingProduct ? (
            <button className={styles.editButton} onClick={handleEditProduct}>
              Update Product
            </button>
          ) : (
            <button className={styles.addButton} onClick={handleAddProduct}>
              Add Product
            </button>
          )}
        </div>
        {/* 🔥 Daftar Produk */}
        <div className={styles.productGrid}>
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <img
                  src={product.image}
                  alt={product.title}
                  className={styles.productImage}
                />
                <div className={styles.productInfo}>
                  <h2 className={styles.productName}>{product.title}</h2>
                  <p className={styles.productPrice}>${product.price}</p>
                  <button
                    className={styles.editButton}
                    onClick={() => setEditingProduct(product)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
        {/* 🔥 Tombol Load More untuk mengambil produk berikutnya */}
        {hasNextPage && (
          <button
            className={styles.loadMoreButton}
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? 'Loading more...' : 'Load More'}
          </button>
        )}
        <ToastContainer /> {/* 🔥 Komponen untuk menampilkan notifikasi */}
      </div>
    </div>
  );
};

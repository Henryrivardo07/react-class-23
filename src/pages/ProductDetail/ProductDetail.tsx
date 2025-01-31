import React from 'react';
import { useParams } from 'react-router-dom'; // Untuk mengambil ID dari URL
import useFetchProductDetail from '@/hooks/useFethcProductDetail';
import styles from './ProductDetail.module.scss'; // Import SCSS module

const ProductDetail = () => {
  // Mengambil ID produk dari URL
  const { id } = useParams<{ id: string }>();

  // Mengambil detail produk menggunakan custom hook
  const { product, loading, error } = useFetchProductDetail(Number(id));

  if (loading) return <div className={styles.container}>Loading...</div>;
  if (error) return <div className={styles.container}>{`Error: ${error}`}</div>;

  return (
    <div className={styles.container}>
      <h1>Product Detail</h1>
      {product && (
        <div className={styles.productDetail}>
          <img src={product.image} alt={product.title} />
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p className={styles.price}>${product.price}</p>
          <p className={styles.category}>Category: {product.category}</p>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;

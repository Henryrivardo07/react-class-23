// src/Home.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Homepage } from '@/pages/HomePage/HomePage';
import { Checkout } from '@/pages/Checkout/Checkout';
import { SearchPage } from '@/pages/SearchPage/SearchPage'; // Import SearchPage
import { CartProvider } from '@/Context/cartContext';
import { SearchProvider } from '@/Context/searchContext'; // Import SearchProvider
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/queryClient';
import PageWithPagination from '@/pages/PageWithPagination/PageWithPagination';
import ProductDetail from '@/pages/ProductDetail/ProductDetail';

export const Home: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <SearchProvider>
          {' '}
          {/* Bungkus seluruh aplikasi dengan SearchProvider */}
          <Router>
            <Routes>
              <Route path='/' element={<Homepage />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route path='/search' element={<SearchPage />} />{' '}
              <Route path='/page-pagination' element={<PageWithPagination />} />
              <Route path='/products/:id' element={<ProductDetail />} />
              {/* Route untuk halaman pencarian */}
            </Routes>
          </Router>
        </SearchProvider>
      </CartProvider>
    </QueryClientProvider>
  );
};

//  {/* <h1 style={{ color: 'red' }}>TUTORIAL REACT JS</h1> */}
//       {/* <LemariAndBook/> */}
//       {/* <DataFetcher/> */}
//       {/* <StateWithMap/> */}
//       {/* <MapState/> */}
//       {/* <CounterDisplay/> */}

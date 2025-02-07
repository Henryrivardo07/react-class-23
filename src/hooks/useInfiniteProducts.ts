import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = 'https://fakestoreapi.com/products';

const fetchProducts = async ({ pageParam = 1 }: { pageParam?: number }) => {
  const response = await axios.get(`${API_URL}?_page=${pageParam}&_limit=10`);
  return response.data ?? []; // Pastikan selalu mengembalikan array, bukan undefined
};

export const useInfiniteProducts = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || !Array.isArray(lastPage) || lastPage.length < 10)
        return null; // Pastikan `lastPage` array
      return allPages.length + 1;
    },
  });

  return {
    products: data?.pages?.flat() ?? [], // Flatten hasil array agar tidak `undefined`
    fetchNextPage,
    hasNextPage: hasNextPage ?? false,
    isFetchingNextPage,
    isLoading,
    error,
  };
};

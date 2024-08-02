import { useInfiniteQuery } from '@tanstack/react-query';
import axios from '@/lib/axios';

const useGetReviewedProducts = (
  userId: number | null | undefined | string | string[],
) => {
  return useInfiniteQuery({
    queryKey: ['userReviewedProducts', userId],
    queryFn: async ({ pageParam = 0 }) => {
      const cursorParam = pageParam ? `cursor=${pageParam}` : '';

      const { data } = await axios.get(
        `users/${userId}/reviewed-products?${cursorParam}`,
      );

      return {
        list: data.list,
        nextCursor: data.nextCursor,
      };
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    staleTime: 60 * 1000 * 30,
    gcTime: 60 * 1000 * 30,
    enabled: userId !== undefined,
  });
};

export default useGetReviewedProducts;

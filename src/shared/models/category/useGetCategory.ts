import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import axios from '@/shared/utils/axios';

const getCategoryRequest = async () => {
  const { data } = await axios.get(`categories`);
  return data;
};

const useGetCategory = () => {
  return useSuspenseQuery({
    queryKey: ['category'],
    queryFn: getCategoryRequest,
  });
};

export default useGetCategory;

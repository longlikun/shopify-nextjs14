// This file is a server component

import { QueryClient, dehydrate } from '@tanstack/react-query';
import { fetchSingleProduct } from '@/app/lib';
import { HydrationBoundary } from '@tanstack/react-query';
import SingleProduct from './SingleProduct'; // 引入单独的客户端组件

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const queryClient = new QueryClient();

  // Prefetch the product data on the server

    await queryClient.prefetchQuery({
      queryKey: ["singleProduct",params],
      queryFn: async () => {
         const response = await fetchSingleProduct(params.handle);
        if (response.status !== 200) {
          throw new Error(response.error || 'Failed to fetch product');
        }
        return response.body; // 只返回 body 部分
      },
    });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <SingleProduct handle={params.handle} />
    </HydrationBoundary>
  );
}
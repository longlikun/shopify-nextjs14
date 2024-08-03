"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import '@/app/globals.css';
import {  useParams } from 'next/navigation';
import { createCart, fetchSingleProduct } from '@/app/lib';
import ProductLayout from '../layout';
import { formatPrice } from '@/util/formatPrice';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/app/products/[handle]/loading';
import ErrorPage from './error';
import { User,getUsers } from '@/app/lib/api-requests';

// 延迟函数
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const SingleProduct = () => {
  const params = useParams<{ handle: string }>();
  console.log('pathname', params?.handle);
  // const [singleProduct, setSingleProduct] = useState<ISingleProduct | undefined>(undefined);


  const { isLoading, error, data: singleProduct } = useQuery({
    queryKey: ['singleProduct', params?.handle],
    queryFn: async () => {
      await delay(2000); // 添加2秒的延迟
         // 模拟错误
      // throw new Error('Simulated error for testing');
       const response = await fetchSingleProduct(params.handle);
      if (response.status !== 200) {
        throw new Error(response.error || 'Failed to fetch product');
      }
      return response.body; // 只返回 body 部分
    },
    enabled: !!params?.handle, // 只有在 handle 存在时才执行查询
  });
  if (isLoading) {
    return <Loading/>;
  }

  if (error) {
    return <ErrorPage message={(error as Error).message}/>;
  }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (params?.handle) {
  //       try {
  //         const response = await fetchSingleProduct(params.handle);
  //         const singleProduct = response.body;
  //         setSingleProduct(singleProduct);
  //       } catch (error) {
  //         console.error('Error fetching product:', error);
  //       }
  //     }
  //   };

  //   fetchData();
  // }, [params?.handle]);

  console.log('singleProduct', singleProduct);
  const imageUrl = singleProduct?.data?.product?.images?.edges[0]?.node?.url;
  // console.log('2',singleProduct?.data.product.variants.edges[0].node.id)
  const lineCollections = [
    {
      merchandiseId: singleProduct?.data.product.variants.edges[0].node.id,
      quantity: 1,
    },
  ];

  // 创建订单
  async function checkout() {
    const data =  createCart(lineCollections);
    const checkoutUrl = (await data).body?.data.cartCreate.cart.checkoutUrl;
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    } else {
      console.error('Checkout URL not found');
    }
  }

  return (
    // <ProductLayout>
      <section className='text-gray-600 body-font overflow-hidden'>
        <div className='container px-5 py-24 mx-auto'>
          <div className='lg:w-4/5 mx-auto flex flex-wrap'>
            <div className='lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0'>
              <h2 className='text-sm title-font text-gray-500 tracking-widest'>
                BRAND NAME
              </h2>
              <h1 className='text-gray-900 text-3xl title-font font-medium mb-4'>
                {singleProduct?.data.product.title}
              </h1>
              <div className='flex mb-4'>
                <a className='flex-grow text-indigo-500 border-b-2 border-indigo-500 py-2 text-lg px-1'>
                  Details
                </a>
                {/* <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Reviews</a> */}
                {/* <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Details</a> */}
              </div>
              <p className='leading-relaxed mb-4'>
                {singleProduct?.data.product.description}{' '}
              </p>
              <div className='flex border-t border-gray-200 py-2'>
                <span className='text-gray-500'>Color</span>
                <span className='ml-auto text-gray-900'>
                  {singleProduct?.data.product.tags[0]}
                </span>
              </div>

              <div className='flex border-t border-b mb-6 border-gray-200 py-2'>
                <span className='text-gray-500'>Quantity</span>
                <span className='ml-auto text-gray-900'>1</span>
              </div>
              <div className='flex'>
                <span className='title-font font-medium text-2xl text-gray-900'>
                  {singleProduct?.data.product.priceRange.minVariantPrice
                      .amount&&
                   formatPrice(singleProduct?.data.product.priceRange.minVariantPrice
                      .amount)
                  }
                </span>
                <button
                  onClick={checkout}
                  className='flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded'
                >
                  马上购买
                </button>
              </div>
            </div>
            {imageUrl && (
              <Image
                width={400}
                height={400}
                alt='ecommerce'
                className='lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded'
                src={imageUrl}
              />
            )}
          </div>
        </div>
      </section>
      // </ProductLayout>
  );
};

export default SingleProduct;

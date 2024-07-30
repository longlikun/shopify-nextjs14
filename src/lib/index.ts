import {
  ICartCreate,
  ICartCreateResponse,
  ILineCollection,
  IProductList,
  IProductListResponst,
  ISingleProduct,
  ISingleProductResponst,
  Product,
} from '@/types';
import { shopifyFetch } from '../util';

const gql = String.raw;

// 查询商品列表
export async function fetchProductList(): Promise<IProductListResponst> {
  const productsListQuery = gql`
    query {
      products(first: 4) {
        edges {
          node {
            id
            title
            description
            tags
            handle
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  `;

  const result = await shopifyFetch<IProductList>(productsListQuery);

  if (result.status === 200) {
    return { status: 200, body: result.body };
  } else {
    console.error('Failed to fetch product list:', result.error);
    return { status: 500, error: result.error || 'Failed to fetch product list.' };
  }
  // try {
  //   const result = await shopifyFetch(productsListQuery);
  //   console.log('result',result)

  //   if (result.body) {
  //     return { status: 200, body: result.body as IProductList };
  //   } else {
  //     throw new Error('Failed to fetch product list.');
  //   }
  // } catch (error) {
  //   console.error('Database Error:', error);
  //   throw new Error('Failed to fetch revenue data.');
  // }
}
// 查询某一商品详情
export async function fetchSingleProduct(
  handle: string
): Promise<ISingleProductResponst> {
  const singleProduct = gql`
    query singleProduct($handle: String!) {
      product(handle: $handle) {
        title
        description
        updatedAt
        tags
        priceRange {
          minVariantPrice {
            amount
          }
        }
        images(first: 1) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  `;


  const result = await shopifyFetch(singleProduct, { handle: handle });

  if (result.status === 200 ) {
    return { status: 200, body: result.body as ISingleProduct };
  } else {
    console.error('Failed to fetch product list:', result.error);
    return { status: 500, error: result.error || 'Failed to fetch product list.' };
  }
  // try {
  //   const result = await shopifyFetch(singleProduct, { handle: handle });

  //   if (result.body) {
  //     return { status: 200, body: result.body as ISingleProduct };
  //   } else {
  //     throw new Error('Failed to fetch product list.');
  //   }
  // } catch (error) {
  //   console.error('Database Error:', error);
  //   throw new Error('Failed to fetch revenue data.');
  // }
}

// checkout
export async function createCart(lines: ILineCollection): Promise<ICartCreateResponse> {
  const checkoutQuery = gql`
    mutation createCart($lines: [CartLineInput!]!) {
      cartCreate(input: { lines: $lines }) {
        cart {
          id
          checkoutUrl
          lines(first: 5) {
            edges {
              node {
                merchandise {
                  ... on ProductVariant {
                    id
                  }
                }
                quantity
              }
            }
          }
        }
      }
    }
  `;

  try {
    const result = await shopifyFetch(checkoutQuery, { lines: lines });

    if (result.body) {
      return { status: 200, body: result.body as ICartCreate };
    } else {
      throw new Error('Failed to fetch product list.');
    }
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

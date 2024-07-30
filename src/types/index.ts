type Image = {
  url: string;
  altText?: string | null;
};

type Price = {
  amount: string;
  currencyCode: string;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  handle: string;
  priceRange: {
    minVariantPrice: Price;
  };
  images: {
    edges: Array<{
      node: Image;
    }>;
  };
};

// 单一商品shopify结构
export type ISingleProduct = {
  data: {
    product: {
      title: string;
      description: string;
      updatedAt: string;
      tags: string[];
      priceRange: {
        minVariantPrice: Price;
      };
      images: {
        edges: Array<{
          node: Image;
        }>;
      };
      variants: {
        edges: Array<{
          node: {
            id: string;
          };
        }>;
      };
    };
  };
};
// 商品列表shopify结构
export type IProductList = {
  data: {
    products: {
      edges: Array<{
        node: Product;
      }>;
    };
  };
};

// 商品列表响应对象
export type IProductListResponst = {
  status: number;
  body?: IProductList;
  error?: string;
};

// 单一商品详情响应对象
export type ISingleProductResponst = {
  status: number;
  body?: ISingleProduct;
  error?: string;
};

type Merchandise = {
  id: string;
};

type CartLine = {
  node: {
    merchandise: Merchandise;
    quantity: number;
  };
};

type Cart = {
  id: string;
  checkoutUrl: string;
  lines: {
    edges: CartLine[];
  };
};

export type ICartCreate = {
  data: {
    cartCreate: {
      cart: Cart;
    };
  };
};

// 单一商品详情响应对象
export type ICartCreateResponse = {
  status: number;
  body?: ICartCreate;
  error?: string;
};

interface LineItem {
  merchandiseId: string|undefined;
  quantity: number;
}
export type ILineCollection = LineItem[];

export type GraphQLResponse = {
  status: number;
  body: JSON;
  error?: string;
};



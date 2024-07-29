import Image from "next/image";
import Link from "next/link";
import { fetchProductList } from "@/lib";
import Header from "./components/header";
import Footer from "./components/footer";

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]
const mockProducts = [
  {
    id: 1,
    title: 'Earthen Bottle',
    href: '#',
    price: '$48',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
  {
    id: 2,
    title: 'Nomad Tumbler',
    href: '#',
    price: '$35',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
  },
  {
    id: 3,
    title: 'Focus Paper Refill',
    href: '#',
    price: '$89',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
  },
  {
    id: 4,
    title: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  // More products...
]
export default async function Home() {

  
// 查询商品列表
  const result = await fetchProductList();

  const productList = result.body?.data.products.edges

  console.log(productList)



  return (
    <div className="bg-white">

      <Header/>
      {/* content */}
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {productList?.map((product) => (
              <Link key={product.node.handle} href={`/products/${product.node.handle}`} className="group">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">

                  <Image
                    width={200}
                    height={200}
                    alt={"product.node.images.edges[0].node.altText"}
                    src={product.node.images.edges[0].node.url}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{product.node.title}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">{product.node.priceRange.minVariantPrice.currencyCode}</p>
                <p className="mt-1 text-lg font-medium text-gray-900">{product.node.priceRange.minVariantPrice.amount}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* footer */}
      <Footer/>


    </div>

  );
}





// app/layout.tsx
import React from 'react';
import '@/app/globals.css'; // 引入全局 CSS 样式
import Header from '@/app/components/header';
import Footer from '@/app/components/footer';

const ProductLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>

      <Header></Header>
      <main>{children}</main>
      <Footer></Footer>

    </>

  );
};

export default ProductLayout;
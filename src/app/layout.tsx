import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "./provider.tsx/ReactQueryProvider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "使用nextjs+shopify 创建一个在线商城",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">  
      <body className={inter.className}>
        <ReactQueryProvider>{children}</ReactQueryProvider></body>
    </html>
  );
}

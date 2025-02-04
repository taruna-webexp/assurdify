import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "Projects Assure DeFi®",
  description: "Projects Assure DeFi® next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="preload"
          href="/_next/static/media/55c55f0601d81cf3-s.woff2"
          as="font"
          type="font/woff2"
          crossorigin="anonymous"
        />
        <link
          rel="preload"
          href="/_next/static/media/26a46d62cd723877-s.woff2"
          as="font"
          type="font/woff2"
          crossorigin="anonymous"
        />

        {/* Preload Critical CSS (jo zaroori CSS hai, wo jaldi load ho jaye) */}
        <link rel="preload" href="/_next/static/css/critical.css" as="style" />

        {/* Asynchronously load non-critical CSS */}
        <link
          rel="stylesheet"
          href="/_next/static/css/non-critical.css"
          media="print"
          onload="this.media='all'"
        />
      </Head>
      <body className={inter.className}>
        <ToastContainer position="bottom-right" />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

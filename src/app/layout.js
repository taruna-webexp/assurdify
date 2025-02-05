import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Inter } from "next/font/google";
import Head from "next/head";

// ✅ Optimize font loading
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false, // Prevents browser fallback causing layout shifts
});

export const metadata = {
  title: "Projects Assure DeFi®",
  description: "Projects Assure DeFi® next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        {/* ✅ Ensure non-critical CSS loads properly (avoids CLS) */}
        <link
          rel="stylesheet"
          href="/_next/static/css/non-critical.css"
          media="print"
          onLoad="this.media='all'"
        />
      </Head>

      <body className={inter.className}>
        {/* ✅ Reserve space for ToastContainer to prevent layout shifts */}
        <div style={{ minHeight: "100px" }}>
          <ToastContainer position="bottom-right" />
        </div>

        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

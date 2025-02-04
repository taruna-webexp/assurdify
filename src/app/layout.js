import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "Projects Assure DeFi®",
  description: "Projects Assure DeFi® next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

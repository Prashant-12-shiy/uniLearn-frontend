import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/HomeComponents/Header.js";
import { QueryProvider } from "@/context/QueryProvider";
import AllContextProvider from "@/context/AllContextProvider";
import Footer from "@/components/HomeComponents/Footer";

export const metadata = {
  title: "Learn Space",
  // description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    // <AllContextProvider>
    <html lang="en">
      <QueryProvider>
        <body
          className={`antialiased bg-gray-100 dark:bg-[#0a0a0a]`}
        >
          <Header />
          <main className="min-h-screen"> {children} </main>
          <Footer />
        </body>
      </QueryProvider>
    </html>
    // </AllContextProvider>
  );
}

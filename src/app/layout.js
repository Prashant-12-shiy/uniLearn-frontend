import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/HomeComponents/Header.js";
import { QueryProvider } from "@/context/QueryProvider";
import AllContextProvider from "@/context/AllContextProvider";
import Footer from "@/components/HomeComponents/Footer";

export const metadata = {
  title: "UniLearn",
  // description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    // <AllContextProvider>
      <html lang="en">
        <body className={`antialiased`}>
          <Header />
          <QueryProvider>{children}</QueryProvider>
          <Footer/>
        </body>
      </html>
    // </AllContextProvider>
  );
}


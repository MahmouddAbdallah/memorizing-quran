import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import AppContextProvider from "./context/appContext";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
axios.defaults.baseURL = 'http://localhost:3000'
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = cookies().get('token')?.value;
  const verifyUser = async () => {
    try {
      const res = await fetch(`${process.env.BASE_URL}/api/verify-me`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (!res.ok) {
        return new Error(await res.text())
      }
      return await res.json()
    } catch (error) {
      console.error(error);
    }
  }
  let data = null;
  if (token) {
    data = await verifyUser()
  }
  return (
    <html lang="ar">
      <body className={inter.className}>
        <AppContextProvider user={data?.user} unReadNotification={data?.unReadNotification}>
          <Navbar />
          <Toaster position="bottom-right" />
          {children}
        </AppContextProvider>
      </body>
    </html>
  );
}

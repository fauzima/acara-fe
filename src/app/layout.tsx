import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Noto_Sans } from "next/font/google";
import Footer from "@/components/footer";
import { SessionProvider } from "@/context/useSession";

export const metadata: Metadata = {
  title: "acara.com | Beli tiket dan manajemen acara!",
  description: "cara.com",
};

const noto = Noto_Sans({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${noto.className} -z-50 min-h-screen antialiased hover:cursor-default`}
      >
        <SessionProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-grow">
              {children}
              <ToastContainer
                className=""
                draggable
                closeOnClick
                autoClose={5000}
                theme="dark"
                position="bottom-right"
              />
            </main>
            <Footer />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}

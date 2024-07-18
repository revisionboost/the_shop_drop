import type { Metadata } from "next";
import "./globals.css";
import MainNav from "@/components/MainNav";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
 
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "The Shop Drop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased relative",
          fontSans.variable
        )}>
        <MainNav />
        <div style={{height:'calc(100dvh - 70px)', position:'relative'}}>
          {children}
        </div>
        {process.env.NODE_ENV !== 'production' && <div className={`fixed bg-red-300 bottom-0 right-0 `}>
          <span className={`block md:hidden`}>SM</span>
          <span className={`hidden md:block lg:hidden`}>MD</span>
          <span className={`hidden lg:block xl:hidden`}>LG</span>
          <span className={`hidden xl:block 2xl:hidden`}>XL</span>
          <span className={`hidden 2xl:block`}>2XL</span>
        </div>}
      </body>
    </html>
  );
}

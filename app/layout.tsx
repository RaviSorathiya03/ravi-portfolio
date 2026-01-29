import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Provider";
import SmoothScroll from "@/components/SmoothScroll";
import CustomScrollbar from "@/components/CustomScrollbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Ravi Sorathiya | Portfolio",
  description: "Ravi Sorathiya - Full-Stack Engineer specializing in React, Next.js, and System Design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          <SmoothScroll>
            <CustomScrollbar />
            {children}
          </SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}

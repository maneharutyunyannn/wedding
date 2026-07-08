import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {Toaster} from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hovhannes & Liana",
  description: "Wedding Invitation",

  openGraph: {
    title: "Wedding Invitation",
    description: "We invite you to our wedding.",
    url: "https://wedding-hovhannes-liana.vercel.app/",
    siteName: "Wedding",
    images: [
      {
        url: "https://wedding-hovhannes-liana.vercel.app/main.jpg",
        width: 1200,
        height: 630,
        alt: "Wedding invitation",
      },
    ],
    locale: "hy_AM",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col safe-area">
      {children}
      <Toaster richColors position="top-right"/>
      </body>
    </html>
  );
}

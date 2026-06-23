import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond, Montserrat, Great_Vibes } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: "--font-cormorant",
  subsets: ["latin", "vietnamese"],
});

const montserrat = Montserrat({
  weight: ['300', '400', '500', '600'],
  variable: "--font-montserrat",
  subsets: ["latin", "vietnamese"],
});

const greatVibes = Great_Vibes({
  weight: '400',
  variable: "--font-great-vibes",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "Thiệp Cưới Online",
  description: "Thiệp cưới sang trọng và tinh tế",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} ${montserrat.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}

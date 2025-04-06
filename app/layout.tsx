import "./globals.css";

import { Montserrat, Roboto } from "next/font/google";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import { getCanonicalUrl } from "@/utils";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "myCommy – Curated Living",
  description:
    "Discover beautifully curated objects for modern living. From cozy corners to statement pieces, myCommy brings character and charm to every space.",
  openGraph: {
    images: [`${getCanonicalUrl()}/assets/og-image.png`],
  },
  alternates: { canonical: getCanonicalUrl() },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" className="h-full">
        <body className="flex min-h-screen flex-col antialiased">
          <Header font={roboto.className} />
          <main className={`${montserrat.className} flex-grow bg-amber-50`}>
            {children}
          </main>
          <Footer font={roboto.className} />
        </body>
      </html>
    </ViewTransitions>
  );
}

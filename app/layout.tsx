import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Merriweather } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/hooks/providers/reactQueryProviders";
import { siteMetadata } from "@/lib/siteMetadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-merriweather",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.url),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.name}`,
  },
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  applicationName: siteMetadata.name,
  authors: [{ name: siteMetadata.author, url: siteMetadata.url }],
  creator: siteMetadata.author,
  publisher: siteMetadata.author,
  alternates: {
    canonical: siteMetadata.url,
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteMetadata.url,
    title: siteMetadata.title,
    description: siteMetadata.description,
    siteName: siteMetadata.name,
    images: [
      {
        url: `${siteMetadata.url}/images/og-cover.png`,
        width: 1200,
        height: 630,
        alt: "Welinas, Platform Literasi Nusantara",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: siteMetadata.twitter,
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [`${siteMetadata.url}/images/og-cover.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  category: "education",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${merriweather.variable} antialiased`}
      >
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Abhijith M S | Home",
    template: "%s | Abhijith M S",
  },
  description:
    "Software Engineer based in Bengaluru, India. Passionate about systems, databases, homelabs, and learning in public. Currently interning at Nokia.",
  keywords: [
    "Abhijith M S",
    "Software Engineer",
    "Bengaluru",
    "Next.js",
    "Homelab",
    "Raspberry Pi",
    "K3s",
    "Full Stack",
    "India",
  ],
  authors: [{ name: "Abhijith M S" }],
  creator: "Abhijith M S",

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://yourdomain.com", // ← Change this to your actual domain
    siteName: "Abhijith M S",
    title: "Abhijith M S | Software Engineer & Homelab Enthusiast",
    description:
      "Software Engineer from Bengaluru building homelabs, side projects, and sharing what I learn. Currently interning at Nokia.",
    images: [
      {
        url: "/banner.jpg",
        width: 1200,
        height: 630,
        alt: "Abhijith M S - Software Engineer & Homelab",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Abhijith M S | Software Engineer",
    description:
      "Software Engineer in Bengaluru • Homelab tinkerer • Learning in public",
    images: ["/banner.jpg"],
    creator: "@ams_132_", // Your X handle
  },

  icons: {
    icon: "/favicon.ico",
    // You can add more: apple, shortcut, etc.
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        {children}
      </body>
    </html>
  );
}
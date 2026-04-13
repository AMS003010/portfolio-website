import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Collection of moments, memories, and visuals — curated by Abhijith M S",

  openGraph: {
    title: "Gallery | Abhijith M S",
    description: "Personal photo gallery — moments collected over time",
    images: [
      {
        url: "/banner.jpg",
        width: 1200,
        height: 630,
        alt: "Abhijith M S Gallery",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Gallery | Abhijith M S",
    description: "Personal photo gallery — moments collected",
    images: ["/banner.jpg"],
  },
};
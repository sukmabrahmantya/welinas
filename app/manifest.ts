import type { MetadataRoute } from "next";

import { siteMetadata } from "@/lib/siteMetadata";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteMetadata.name,
    short_name: "Welinas",
    description: siteMetadata.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#F5F3F0",
    theme_color: "#1E293B",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

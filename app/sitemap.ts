import type { MetadataRoute } from "next";

import { siteMetadata } from "@/lib/siteMetadata";

const staticRoutes = [
  "/",
  "/login",
  "/signup",
  "/dashboard",
  "/dashboard/quiz",
  "/dashboard/quiz/belajar",
  "/dashboard/quiz/game",
  "/dashboard/history",
  "/dashboard/sastra",
  "/dashboard/capture",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return staticRoutes.map((route) => ({
    url: `${siteMetadata.url}${route}`,
    lastModified: now,
  }));
}

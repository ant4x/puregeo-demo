import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Wildflower Retreats — slow travel on the Georgian coast",
    short_name: "Wildflower",
    description:
      "Small-group slow travel weeks on the Black Sea coast of Georgia. Demo site with a fictional offer.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f5f1",
    theme_color: "#DA291C",
    icons: [
      {
        src: "/icons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

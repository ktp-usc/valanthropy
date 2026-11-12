import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // The Leadership page used to live at /about-leadership.
    return [
      { source: "/about-leadership", destination: "/leadership", permanent: false },
      // The partners page used to live at /partners-and-sponsors.
      { source: "/partners-and-sponsors", destination: "/become-a-partner", permanent: false },
    ];
  },
  images: {
    // Photos uploaded in WordPress (used by the Leadership page).
    remotePatterns: [
      { protocol: "https", hostname: "valanthropy.org", pathname: "/wp-content/uploads/**" },
    ],
  },
};

export default nextConfig;

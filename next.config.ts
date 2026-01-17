import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kwleivfihlkgjtzvndbp.supabase.co",
        pathname: "/storage/v1/object/public/avatar/**",
      },
    ],
  },
};

export default nextConfig;

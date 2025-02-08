import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['avatar.iran.liara.run'],
  },
  eslint:{
    ignoreDuringBuilds:true
  }

};

export default nextConfig;

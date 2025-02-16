import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['avatar.iran.liara.run',"assets.aceternity.com"],
  },
  eslint:{
    ignoreDuringBuilds:true
  }

};

export default nextConfig;

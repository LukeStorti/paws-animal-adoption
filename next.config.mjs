/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cdmvyaomzbmsumofwkhj.supabase.co",
        protocol: "https",
        port: "",
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;

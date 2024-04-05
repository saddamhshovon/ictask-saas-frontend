/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ictask.ddns.net",
        port: "",
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;

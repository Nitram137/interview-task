/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vieraboschkova.github.io",
        port: "",
        pathname: "/swapi-gallery/static/assets/img/people/**",
      },
    ],
  },
};

export default nextConfig;

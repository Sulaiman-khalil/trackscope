/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  turbopack: {
    root: __dirname,
  },
  experimental: {
    // @ts-ignore: not yet typed in NextConfig
    allowedDevOrigins: ["http://192.168.178.57:3000"],
  },
};

export default nextConfig;

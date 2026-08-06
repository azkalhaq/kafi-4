/** @type {import('next').NextConfig} */
const repo = "kafi-4";
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : undefined,
  images: { unoptimized: true },
  trailingSlash: true
};

export default nextConfig;

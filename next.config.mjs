/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Static export for GitHub Pages (user site at the domain root, no basePath).
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;

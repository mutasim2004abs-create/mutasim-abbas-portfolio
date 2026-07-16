/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Static export served as a GitHub Pages project site.
  output: "export",
  basePath: "/mutasim-abbas-portfolio",
  images: { unoptimized: true },
};

export default nextConfig;

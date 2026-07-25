/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Ensure the book content ships with the serverless function on Vercel.
    outputFileTracingIncludes: {
      "/vaisseau/[n]": ["./content/vaisseau-chapters.json"],
    },
  },
};

export default nextConfig;

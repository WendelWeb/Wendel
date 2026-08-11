/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Ensure the book content ships with the serverless functions on Vercel.
    // The liturgy emails read the chapters too, so the cron route needs it as
    // much as the reading page — without this, sending crashes with ENOENT in
    // production while working perfectly in dev.
    outputFileTracingIncludes: {
      "/vaisseau/[n]": ["./content/vaisseau-chapters.json"],
      "/api/cron/morning": ["./content/vaisseau-chapters.json"],
    },
  },
};

export default nextConfig;

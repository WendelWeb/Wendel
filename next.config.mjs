/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Sans ca, revenir sur une page dans les 30 s rejoue le rendu mis en
    // cache par le routeur client : contenu identique, alors que le serveur
    // aurait tire autre chose. L app repose entierement sur ce tirage.
    staleTimes: { dynamic: 0, static: 0 },
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

import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        // This handles the GET request for the script file
        source: '/api/stats/va.js',
        destination: '/_vercel/insights/script.js',
      },
      {
        // This handles the data pings (POST requests)
        source: '/api/stats/:match*',
        destination: '/_vercel/insights/:match*',
      },
    ];
  },
};

export default withNextIntl(nextConfig);
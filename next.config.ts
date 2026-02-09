import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

export const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        // Masking the script file itself to avoid "script.js" filters
        source: '/api/stats/va.js', 
        destination: '/_vercel/insights/script.js',
      },
      {
        // Masking the data reporting endpoint
        source: '/api/stats/:match*',
        destination: '/_vercel/insights/:match*',
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
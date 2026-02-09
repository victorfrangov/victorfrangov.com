import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

export const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        // 1. Masking Web Analytics
        source: '/api/stats/:match*',
        destination: '/_vercel/insights/:match*',
      },
      {
        // 2. Optional: Masking Speed Insights
        source: '/api/vitals/:match*',
        destination: '/_vercel/speed-insights/:match*',
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
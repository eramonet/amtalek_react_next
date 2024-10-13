import { createProxyMiddleware } from "http-proxy-middleware";
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  redirects: async () => {
    return [];
  },

  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        // ${process.env.NEXT_PUBLIC_BASE_URL_FULL}
        destination: `https://amtalek.com/amtalekadmin/public/api/web/:path*`, // البروكسي إلى الخادم
      },
    ];
  },

  images: {
    domains: [
      "amtalek.com",
      "amtalek.amtalek.com",
      "firebasestorage.googleapis.com",
      "cdn.pixabay.com",
    ], // أضف هنا النطاقات التي تريد السماح بتحميل الصور منها
  },
};

export default nextConfig;

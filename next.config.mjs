/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  async redirects() {
    return [];
  },

  rewrites: async () => {
    return {
      fallback: [
        {
          source: "/api/:path*",
          destination: "https://amtalek.com/:path*",
        },
      ],
    };
  },
  images: {
    domains: ["amtalek.com"], // أضف هنا النطاقات التي تريد السماح بتحميل الصور منها
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://amtalek.com/amtalekadmin/public/api/web/:path*", // البروكسي إلى الخادم
      },
    ];
  },
};

export default nextConfig;

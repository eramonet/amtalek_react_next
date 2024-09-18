/** @type {import('next').NextConfig} */
const nextConfig = {
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

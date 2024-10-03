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
        destination: `${process.env.NEXT_PUBLIC_BASE_URL_FULL}:path*`, // البروكسي إلى الخادم
      },
    ];
  },

  images: {
    domains: ["amtalek.com", "amtalek.amtalek.com", "firebasestorage.googleapis.com"], // أضف هنا النطاقات التي تريد السماح بتحميل الصور منها
  },
};

export default nextConfig;

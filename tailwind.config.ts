import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/allPages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "custome-white": "#fff",
        "custome-black": "#000",
        "custome-blue": "#005879",
        "custome-venice": "#edf3f8",
        "transparent-blue": "#00587961",
        "custome-yellow": "#ffd119",
        "custome-gray": "#ced4d6",
        "custome-red": "#ff6665",
        primary: "#01425a",
      },
      container: {
        center: true,
        // padding: "1rem",
        screens: {
          DEFAULT: "100%",
          sm: "600px",
          md: "728px",
          lg: "984px",
          xl: "1240px",
          "2xl": "1427.75px", // هنا تقوم بتحديد الحد الأقصى للـ container
        },
      },
    },
    screens: {
      xxxxl: { max: "1500px" },
      xxxl: { max: "1450px" },
      xxl: { max: "1350px" },
      xlll: { max: "1290px" },
      xll: { max: "1270px" },
      xl: { max: "1200px" },
      alg: { max: "1180px" },
      lg: { max: "1130px" },
      cll: { max: "1080px" },
      clg: { max: "1016px" },
      blg: { max: "950px" },
      amd: { max: "900px" },
      md: { max: "768px" },
      fmd: { max: "750px" },
      bmd: { max: "719px" },
      asmm: { max: "670px" },
      asm: { max: "650px" },
      ss: { max: "600px" },
      sm: { max: "550px" },
      axss: { max: "450px" },
      axs: { max: "400px" },
      xs: { max: "375px" },
      mb: { min: "350px" },
    },
  },
  plugins: [],
};
export default config;

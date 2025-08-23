import type { UserConfig } from "next-i18next";
const i18nConfig: UserConfig = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "urhobo"],
  },
  localePath: "./public/locales",
};

const nextConfig = {
  ...i18nConfig,
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;

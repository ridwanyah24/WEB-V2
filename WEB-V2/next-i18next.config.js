/** @type {import('next-i18next').UserConfig} */
const nextI18NextConfig = {
  i18n: {
    defaultLocale: "urhobo",
    locales: ["urhobo", "en"],
    fallbackLng: "urhobo",
  },
  localePath: "public/locales", // folder to store language JSON files
};

module.exports = nextI18NextConfig;

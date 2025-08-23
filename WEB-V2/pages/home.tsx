import React from "react";
import Navbar from "./components/layouts/Navbar";
import HomeSection from "./components/HomeSection";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";



const Home = () => {
  return (
    <div>
      <div className="flex justify-end">
        <Navbar />
      </div>
      <HomeSection />
    </div>
  );
};

Home.requiresAuth = true;

export default Home;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
});

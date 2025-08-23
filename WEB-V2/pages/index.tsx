import Hero from "./components/Hero";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps } from "next";

export default function Home() {
  return (
    <div className=" bg-[#f2feff] min-h-[100vh]">
      <Header/>
      <main className="container w-full max-w-7xl mx-auto">
        <Hero />
      </main>
      <Footer />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
});

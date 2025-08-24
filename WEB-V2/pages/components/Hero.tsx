import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";

const Hero = () => {
  const [platform, setPlatform] = useState("");
  const [downloadLink, setDownloadLink] = useState("");
  const [buttonLabel, setButtonLabel] = useState("");
  const [iconSrc, setIconSrc] = useState("");
  const { t, i18n } = useTranslation("common");

  useEffect(() => {
    const userAgent = typeof window !== "undefined" ? navigator.userAgent : "";

    if (/android/i.test(userAgent)) {
      // Android devices
      setPlatform("android");
      setDownloadLink("https://play.google.com/store/apps/details?id=com.guono.mobile");
      setButtonLabel("Play Store");
      setIconSrc("/icons/android.png");

    } else if (/iPad|iPhone|iPod/.test(userAgent) && !(window as unknown as { MSStream?: unknown }).MSStream) {
      // iOS devices
      setPlatform("ios");
      setDownloadLink("https://apps.apple.com/ng/app/6744582441");
      setButtonLabel("App Store");
      setIconSrc("/icons/apple-store.png");

    } else if (/Win/i.test(userAgent)) {
      // Windows desktops
      setPlatform("windows");
      setDownloadLink("https://play.google.com/store/apps/details?id=com.guono.mobile");
      setButtonLabel("Play Store");
      setIconSrc("/icons/android.png");

    } else if (/Mac/i.test(userAgent)) {
      // Mac desktops
      setPlatform("mac");
      setDownloadLink("https://apps.apple.com/ng/app/6744582441");
      setButtonLabel("App Store");
      setIconSrc("/icons/apple-store.png");

    } else {
      // Fallback for other OS (Linux, etc.)
      setPlatform("other");
      setDownloadLink("https://play.google.com/store/apps/details?id=com.guono.mobile");
      setButtonLabel("Play Store");
      setIconSrc("/icons/android.png");
    }
  }, []);

  // useEffect(() => {
  //   if (i18n.language !== "urhobo") {
  //     i18n.changeLanguage("urhobo");
  //   }
  // }, [i18n]);

  return (
    <section className="flex text-center items-center flex-col mt-10 p-4">
      <h2 className="font-semibold text-[2.375rem] xl:text-[3.375rem] text-[#05353A]">
        {t("Learn and Speak Urhobo")}
      </h2>
      <p className="text-xl">
        {t(
          "Guọnọ helps you discover, speak and revive the Urhobo language so easily",
        )}
      </p>

      <a
        href={downloadLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5"
      >
        <button className="flex items-center justify-center gap-2 bg-[#05353A] text-white py-3  rounded-lg px-3 mx-auto hover:opacity-90 transition">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={`${platform} icon`}
              width={24}
              height={24}
            />
          )}
          <span className="text-lg">
            {t("Download")} {buttonLabel}
          </span>
        </button>
      </a>

      <Image
        src="/guono-mobile.png"
        width={500}
        height={500}
        alt="guono mobile"
        className="my-10"
      />
    </section>
  );
};

export default Hero;

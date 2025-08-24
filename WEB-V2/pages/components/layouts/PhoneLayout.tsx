import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";

function PhoneLayout() {
  const [platform, setPlatform] = useState("");
  const [downloadLink, setDownloadLink] = useState("");
  const { t } = useTranslation("common");

  useEffect(() => {
    const userAgent = typeof window !== "undefined" ? navigator.userAgent : "";

    if (/android/i.test(userAgent)) {
      setPlatform("android");
      setDownloadLink("https://play.google.com/store/apps/details?id=com.guono.mobile");
    } else if (
      /iPad|iPhone|iPod/.test(userAgent) &&
      !(window as unknown as { MSStream?: unknown }).MSStream
    ) {
      setPlatform("ios");
      setDownloadLink(
        "https://apps.apple.com/ng/app/6744582441",
      );
    } else {
      setPlatform("other");
      setDownloadLink("https://apps.apple.com/ng/app/6744582441");
    }
  }, []);

  return (
    <section
      aria-hidden={true}
      className="lg:flex lg:flex-col lg:items-center justify-center bg-[#073B3A] text-white hidden"
    >
      <div className=" flex flex-col justify-between items-center">
        <Image
          src="/guono-mobile.png"
          width="450"
          height="400"
          loading="lazy"
          alt="Mobile app preview"
        />
      </div>
      <a
        href={downloadLink}
        aria-label={`${platform} download`}
        className="text-[#ffff] -my-4 font-semibold"
      >
        {t("Sign up to download here")}
      </a>
    </section>
  );
}

export default PhoneLayout;

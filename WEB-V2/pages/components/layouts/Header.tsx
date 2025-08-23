import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";
import { LiaTimesSolid } from "react-icons/lia";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";


function Header() {

  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { t, i18n } = useTranslation("common");

  // Toggle menu state
  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (i18n.language !== "urhobo") {
      i18n.changeLanguage("urhobo");
    }
  }, [i18n]);

  // Change language
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
    // changes global language context
  };

  // Define navigation links
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Encyclopedia", href: "/encyclopedia" },
    { label: "Donate", href: "/donate" },
  ];

  return (
    <header className="max-w-7xl mx-auto w-full">
      <div className="flex justify-between items-center h-[91px] px-3 py-6">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/guọnọ-logo.svg"
            alt="guọnọ-logo"
            width="100"
            height="30"
            aria-label="Guọnọ logo"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex justify-between items-center space-x-6"
          aria-label="Main navigation"
        >
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={`text-[1.125rem] text-[#05353A] ${router.pathname === link.href ? "font-bold" : "font-normal"
                } hover:opacity-90 transition-opacity`}
            >
              {t(link.label)}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions: Sign in + Language Selector */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/signin"
            className="flex items-center justify-center gap-2 bg-[#05353A] text-white py-3 rounded-lg w-[100px] hover:opacity-90 transition"
          >
            {t("Sign in")}
          </Link>

          {/* Language dropdown */}
          <select
            onChange={handleLanguageChange}
            defaultValue={"urhobo"} // default to Urhobo
            className="border border-[#05353A] text-[#05353A] rounded-lg px-2 py-2 text-sm focus:outline-none"
          >
            <option value="urhobo">Urhobo</option>
            <option value="en">English</option>
          </select>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isOpen ? (
            <LiaTimesSolid className="w-6 h-6 text-[#05353A]" />
          ) : (
            <AiOutlineMenu className="w-6 h-6 text-[#05353A]" />
          )}
        </button>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 bg-[#f2feff] z-50 flex flex-col px-3 py-4 space-y-6">
            {/* Top bar with logo and close button */}
            <div className="flex justify-between items-center mt-4 mb-8">
              <Image
                src="/guọnọ-logo.svg"
                alt="guọnọ"
                width="100"
                height="30"
                aria-label="Guọnọ logo"
              />
              <button
                className="md:hidden focus:outline-none"
                onClick={toggleMenu}
                aria-label="Toggle Menu"
              >
                {isOpen ? (
                  <LiaTimesSolid className="w-6 h-6 text-[#05353A]" />
                ) : (
                  <AiOutlineMenu className="w-6 h-6 text-[#05353A]" />
                )}
              </button>
            </div>

            {/* Navigation Links */}
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-[1.125rem] font-semibold text-[#05353A]"
              >
                {t(link.label)}
              </Link>
            ))}

            {/* Sign in + Language */}
            <Link
              href="/signin"
              className="flex items-center justify-center gap-2 bg-[#05353A] text-white py-3 rounded-lg w-full hover:opacity-90 transition"
            >
              {t("Sign in")}
            </Link>

            <select
              onChange={handleLanguageChange}
              defaultValue={"urhobo"}
              className="border border-[#05353A] text-[#05353A] rounded-lg px-2 py-2 text-sm focus:outline-none"
            >
              <option value="urhobo">Urhobo</option>
              <option value="en">English</option>
            </select>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;

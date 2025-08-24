import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { LiaTimesSolid } from "react-icons/lia";
import { useRouter } from "next/router";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import ProfileModal from "../ProfileModal";
import UsernameModal from "../UsernameModal";
import PasswordModal from "../PasswordModal";
import DeleteAccountModal from "../DeleteModal";
import { logOut } from "@/utils/api-service";
import { useAppDispatch, useAppSelector } from "@/types/hooks";
import { toast } from "react-hot-toast";
import { useTranslation } from "next-i18next";
import { profileLinks } from "@/types";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const { token } = useAppSelector((state) => state.signin);
  const router = useRouter();
  const profileRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  // Toggle functions
  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  const openModal = (modalName: string) => {
    setActiveModal(modalName);
    setIsProfileOpen(false);
    setIsOpen(false);
  };

  const closeModal = () => setActiveModal(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogOut = async () => {
    try {
      const result = await logOut(dispatch, token);
      if (result.success) {
        toast.success("Logout successful");
        router.push("/");
      } else {
        toast.error(result.error || "Logout failed");
      }
    } catch {
      toast.error("Logout failed");
    }
  };

  // Language switching
  const { i18n, t } = useTranslation("common");
  const locales = [
    { code: "en", label: "English" },
    { code: "urhobo", label: "Urhobo" },
  ];

  const changeLanguage = (lng: string) => {
    const { pathname, asPath, query } = router;
    i18n.changeLanguage(lng);
    router.push({ pathname, query }, asPath, { locale: lng });
  };

  return (
    <div className="flex py-6 items-center justify-between space-x-4">
      {/* Left controls */}
      <div className="flex items-center space-x-4">
        {/* Language Dropdown */}
        <select
          value={router.locale}
          onChange={(e) => changeLanguage(e.target.value)}
          className="border border-[#05353A]/30 rounded-md px-3 py-1 bg-white text-[#05353A] font-medium focus:outline-none focus:ring-1 focus:ring-[#05353A] cursor-pointer"
        >
          {locales.map((lng) => (
            <option key={lng.code} value={lng.code}>
              {lng.label}
            </option>
          ))}
        </select>

        {/* Profile dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={toggleProfile}
            className="flex items-center focus:outline-none"
            aria-label="Profile menu"
            aria-expanded={isProfileOpen}
          >
            <Image
              src="/man.png"
              alt="User profile"
              className="rounded-full cursor-pointer"
              width={40}
              height={40}
            />
          </button>

          {isProfileOpen && (
            <div className="hidden md:block absolute right-0 mt-4 w-[280px] md:w-[300px] bg-white rounded-xl shadow-[4px_4px_16px_0px_#00000026] py-6 z-50">
              <div className="flex flex-col">
                {profileLinks.map((link, index) => (
                  <button
                    key={index}
                    onClick={() => openModal(link.modal)}
                    className="group px-4 py-2 text-sm text-[#05353a] hover:bg-[#05353a] flex justify-between items-center transition-colors duration-200"
                  >
                    <span className="group-hover:text-[#f2feff]">
                      {t(link.label)}
                    </span>
                    <MdOutlineArrowForwardIos className="text-[#05353a] group-hover:text-[#f2feff] transition-colors duration-200" />
                  </button>
                ))}
                <button
                  className="flex self-center text-[#ff0000] mt-4 cursor-pointer"
                  onClick={handleLogOut}
                >
                  {t("Log out")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu button */}
      <button
        className="md:hidden"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <LiaTimesSolid size={24} className="text-[#05353A]" />
        ) : (
          <AiOutlineMenu size={24} className="text-[#05353A]" />
        )}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 mx-6 rounded-xl bg-white shadow-md z-50 p-2">
          <div className="flex flex-col space-y-4">
            {profileLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => openModal(link.modal)}
                className="px-4 py-2 text-left text-[#05353a] hover:bg-[#05353a] hover:text-white transition-colors duration-200"
              >
                {t(link.label)}
              </button>
            ))}
            <button
              className="px-4 py-2 text-left text-[#ff0000]"
              onClick={handleLogOut}
            >
              {t("Log out")}
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      {activeModal === "personalDetails" && (
        <ProfileModal closeModal={closeModal} />
      )}
      {activeModal === "username" && <UsernameModal closeModal={closeModal} />}
      {activeModal === "password" && <PasswordModal closeModal={closeModal} />}
      {activeModal === "delete" && (
        <DeleteAccountModal closeModal={closeModal} />
      )}
    </div>
  );
}

export default Navbar;

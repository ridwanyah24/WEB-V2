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
import { setLanguage } from "@/store/changeLangSlice";
import { RootState } from "@/store/store";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const { token } = useAppSelector((state) => state.signin);
  const router = useRouter();
  const profileRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  // Toggle functions
  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
  const language = useAppSelector((state: RootState) => state.language.language);

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

  // after (using Redux like handleLanguageChange)
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value as "en" | "urhobo";
    dispatch(setLanguage(lang)); // update Redux state
    i18n.changeLanguage(lang); // sync with i18n
  };

  return (
    <div className="flex py-6 items-center justify-between space-x-4">
      {/* Left controls */}
      <div className="flex items-center space-x-4">
        {/* Language Dropdown */}
        <select
          onChange={handleLanguageChange}
          value={language} // controlled by Redux
          className="border border-[#05353A] text-[#05353A] rounded-lg px-2 py-2 text-sm focus:outline-none"
        >
          <option value="urhobo">Urhobo</option>
          <option value="en">English</option>
        </select>

        <div className="relative" ref={profileRef}>
          <button
            onClick={toggleProfile}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#F5DEB350] transition-colors"
            aria-label="Profile menu"
            aria-expanded={isProfileOpen}
          >
            {/* Profile Image */}
            <Image
              src="/man.png"
              alt="User profile"
              className="rounded-full cursor-pointer border border-gray-200"
              width={36}
              height={36}
            />

            {/* Username + Chevron */}
            <span className="flex items-center gap-1 text-sm font-medium text-gray-800">
              <p>{user?.firstName || "User"} {user?.lastName}</p>
              <svg
                className={`w-4 h-4 text-gray-600 transition-transform ${isProfileOpen ? "rotate-180" : "rotate-0"
                  }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>

          {/* Dropdown menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-[280px] md:w-[300px] bg-white rounded-xl shadow-[0_4px_16px_0px_rgba(0,0,0,0.15)] py-4 z-50">
              <div className="flex flex-col">
                {profileLinks.map((link, index) => (
                  <button
                    key={index}
                    onClick={() => openModal(link.modal)}
                    className="group px-4 py-2 text-sm text-gray-700 hover:bg-[#05353a] flex justify-between items-center transition-colors duration-200"
                  >
                    <span className="group-hover:text-white">
                      {t(link.label)}
                    </span>
                    <MdOutlineArrowForwardIos className="text-gray-500 group-hover:text-white transition-colors duration-200" />
                  </button>
                ))}
                <button
                  className="flex self-center text-red-600 mt-3 font-medium hover:underline"
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

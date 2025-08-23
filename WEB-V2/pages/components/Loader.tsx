import React from "react";
import { RiLoader2Fill } from "react-icons/ri";

const Loader: React.FC = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
    <RiLoader2Fill className="text-4xl text-[#073B3A] animate-spin" />
  </div>
);

export default Loader;

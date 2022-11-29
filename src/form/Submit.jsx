import React from "react";
import { ImSpinner3 } from "react-icons/im";

export default function Submit({ value, busy, type, onClick, title }) {
  return (
    <button
      type={type || "submit"}
      className="w-full rounded dark:bg-white bg-blue-800 dark:text-secondary text-white hover:bg-opacity-90 transition font-semibold text-lg cursor-pointer h-10 flex items-center justify-center"
      onClick={onClick}
    >
      {busy ? <ImSpinner3 className="animate-spin" /> : value}
      {title}
    </button>
  );
}

export const ShortSubmitButton = ({ value, busy, type, onClick, title }) => {
  return (
    <button
      type={type || "submit"}
      className=" w-36 rounded dark:bg-white bg-blue-800 dark:text-secondary text-white hover:bg-opacity-90 transition font-semibold text-lg cursor-pointer h-10 flex items-center justify-center"
      onClick={onClick}
    >
      {busy ? <ImSpinner3 className="animate-spin" /> : value}
      {title}
    </button>
  );
};

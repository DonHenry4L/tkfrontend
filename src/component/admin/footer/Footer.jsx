import React from "react";

export default function Footer() {
  return (
    <div>
      <footer className=" bg-slate-500 p-4 rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
        <span className="text-sm text-gray-400 sm:text-center dark:text-gray-400">
          © 2022{" "}
          <a href="https://tksarl.com/" className="hover:underline">
            Tksarl™
          </a>
          . All Rights Reserved.
        </span>
        <p className="flex dark:text-gray-400 text-blue-900 text-center text-lg justify-center font-serif">
          Built with <img src="./image/love_built.png" className="w-8" alt="" />{" "}
          by 9tech.network inc.
        </p>
      </footer>
    </div>
  );
}

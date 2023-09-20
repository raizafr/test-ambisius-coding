"use client";

import { useResetContext } from "@/context/ResetContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FiRefreshCw } from "react-icons/fi";
import { BsCheckLg } from "react-icons/bs";

export default function Navbar() {
  const pathname = usePathname();
  const { reset, setReset } = useResetContext();

  const handleClickClearLocalStorage = () => {
    localStorage.clear();
    setReset(true);
  };

  return (
    <nav className="mt-5 lg:w-1/2 md:w-2/3 rounded-md">
      <div className="flex justify-between w-full ">
        <ul className="flex text-sm rounded bg-[#F1F5F9] p-1">
          <Link
            href={"/menu"}
            className={`${
              pathname == "/menu" ? "bg-[#FFFFFF]" : ""
            } md:px-7 px-2 py-1.5 rounded`}
          >
            Menu
          </Link>
          <Link
            href={"/order"}
            className={`${
              pathname == "/order" ? "bg-[#FFFFFF]" : ""
            } md:px-7 px-2 py-1.5 rounded`}
          >
            Order
          </Link>
          <Link
            href={"/dapur"}
            className={`${
              pathname == "/dapur" ? "bg-[#FFFFFF]" : ""
            } md:px-7 px-2 py-1.5 rounded`}
          >
            Dapur
          </Link>
          <Link
            href={"/kasir"}
            className={`${
              pathname == "/kasir" ? "bg-[#FFFFFF]" : ""
            } md:px-7 px-2 py-1.5 rounded`}
          >
            Kasir
          </Link>
        </ul>
        <div>
          {reset && (
            <div className="fixed -mt-10 -ml-28 lg:-ml-10 md:-ml-12  bg-green-600 text-white text-sm px-3 py-1 font-semibold rounded-md flex items-center gap-2">
              <span className="scale-[1.4]">
                <BsCheckLg />
              </span>
              <p>Data Telah di Reset ulang</p>
            </div>
          )}

          <button
            className="flex border items-center px-4 text-sm gap-2 rounded-md hover:bg-[#F1F5F9] duration-300 h-10"
            onClick={handleClickClearLocalStorage}
          >
            <span className="scale-125">
              <FiRefreshCw />
            </span>
            <span>Reset</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

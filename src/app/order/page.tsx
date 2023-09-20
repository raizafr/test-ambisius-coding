"use client";

import { useResetContext } from "@/context/ResetContext";
import React, { useEffect, useState } from "react";


export default function Order() {
  const [allMenu, setAllMenu] = useState<[]>([]);
  const [selectedMeja, setSelectedMeja] = useState<string>("");
  const [selectMenu, setSelectMenu] = useState<string>("");
  const [selectQuantity, setSelectQuantity] = useState<string>("");
  const [allOrder, setAllOrder] = useState<{ meja: string; menu: string; quantity: string }[]>([]);
  const { reset } = useResetContext();
  
  useEffect(() => {
    const storedMenu = localStorage.getItem("menu");
    const storedOrder = localStorage.getItem("order");
    if (storedMenu) {
      setAllMenu(JSON.parse(storedMenu));
    }
    if (storedOrder) {
      setAllOrder(JSON.parse(storedOrder));
    }
    if(reset){
      setAllMenu([])
    }
  }, [reset]);

  const disbaleButton = () => {
    if (selectedMeja === "" || selectMenu === "" || selectQuantity === "") {
      return false;
    }
    return true;
  };

  const handleClickMeja = (meja:string) => {
    setSelectedMeja(meja);
  };

  const handleSelectMenu = (e:any) => {
    setSelectMenu(e.target.value);
  };

  const handleSelectKuantity = (e:any) => {
    setSelectQuantity(e.target.value);
  };

  const handleClickAddOrder = () => {
    const newOrder = {
      meja: selectedMeja,
      menu: selectMenu,
      quantity: selectQuantity,
    };
    setAllOrder([...allOrder,newOrder]);
    setSelectedMeja("");
    localStorage.setItem("order", JSON.stringify([...allOrder, newOrder]));
  };

  return (
    <section className="bg-[#F1F5F9] mt-4 px-6 py-4 rounded-md min-h-[300px] lg:w-1/2 md:w-2/3 w-full">
      <div className="w-full border rounded-md text-center flex bg-white text-sm">
        <div
          className={`${
            selectedMeja === "1"
              ? "bg-[#000000] text-white"
              : "hover:bg-[#F1F5F9]"
          } w-1/3 border-r py-5 cursor-pointer rounded-l-md`}
          onClick={() => handleClickMeja("1")}
        >
          Meja 1
        </div>
        <div
          className={`${
            selectedMeja === "2"
              ? "bg-[#000000] text-white"
              : "hover:bg-[#F1F5F9]"
          } w-1/3 border-r py-5 cursor-pointer`}
          onClick={() => handleClickMeja("2")}
        >
          Meja 2
        </div>
        <div
          className={`${
            selectedMeja === "3"
              ? "bg-[#000000] text-white"
              : "hover:bg-[#F1F5F9]"
          } w-1/3 py-5 cursor-pointer rounded-r-md`}
          onClick={() => handleClickMeja("3")}
        >
          Meja 3
        </div>
      </div>
      <div className="flex w-full gap-3 mt-3">
        <div className="flex flex-col w-3/5 lg:w-4/5 gap-2">
          <label
            htmlFor="pilihMenu"
            className="text-sm leading-none opacity-80"
          >
            Menu
          </label>
          <select
            name="pilihMenu"
            id="pilihMenu"
            className="h-10 px-4 text-sm rounded-md"
            onChange={handleSelectMenu}
          >
            <option value="">Pilih menu</option>
            {allMenu.map((menu:any, i:number) => (
              <option value={menu.name} key={i}>
                {menu.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col w-2/5 lg:w-1/5 gap-2">
          <label htmlFor="jumlah" className="text-sm leading-none opacity-80">
            Jumlah
          </label>
          <select
            name="jumlah"
            id="jumlah"
            className="h-10 px-4 text-sm rounded-md"
            onChange={handleSelectKuantity}
          >
            <option value="">Kuantitas</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end mt-3">
        <button
          onClick={handleClickAddOrder}
          className={`${
            !disbaleButton() ? "bg-[#808691]" : "bg-[#0F172A]"
          }  text-white px-5 rounded-md h-10`}
          disabled={disbaleButton() == false}
        >
          Tambah
        </button>
      </div>
    </section>
  );
}

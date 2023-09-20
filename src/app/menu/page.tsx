"use client";

import { useResetContext } from "@/context/ResetContext";
import React, {  useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";

type Menu = {
  id: string;
  name: string;
};

const generateId = (): string => {
  const randomID = Math.floor(1000 + Math.random() * 9000).toString();
  return randomID;
};

export default function Menu() {
  const [menu, setMenu] = useState<Menu[]>([]);
  const [newMenuItem, setNewMenuItem] = useState<string>("");
  const { reset } = useResetContext();
  
  useEffect(() => {
    const storedMenu:any = localStorage.getItem("menu");
    if (storedMenu) {
      setMenu(JSON.parse(storedMenu));
    }
    if(reset){
      setMenu([])
    }
    
  }, [reset,setMenu]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMenuItem(e.target.value);
  };

  const handleAddMenu = () => {
    const randomID:string = generateId();
    const newMenu: Menu = { id: randomID, name: newMenuItem };
    setMenu([...menu, newMenu]);
    setNewMenuItem("");
    localStorage.setItem("menu", JSON.stringify([...menu, newMenu]));
  };

  const handleDeleteMenu = (id: string) => {
    const updatedMenu:any = menu.filter((menuItem) => menuItem.id !== id);
    setMenu(updatedMenu);
    localStorage.setItem("menu", JSON.stringify(updatedMenu));
  };

  return (
    <section className="bg-[#F1F5F9] mt-4 px-6 py-4 rounded-md min-h-[300px] lg:w-1/2 md:w-2/3 w-full">
      <div className="space-y-1">
        <label
          htmlFor="menu"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed opacity-70"
        >
          Menu Makanan
        </label>
        <div className="flex space-x-2">
          <input
            onChange={handleInputChange}
            value={newMenuItem}
            type="text"
            id="menu"
            placeholder="Tambahkan disini..."
            className="h-10 w-full px-4 text-sm rounded-md"
          />
          <button
            onClick={handleAddMenu}
            className={`${
              newMenuItem != "" ? "bg-[#0F172A]" : "bg-[#808691]"
            } text-white  px-5 rounded-md`}
            disabled={newMenuItem === ""}
          >
            Tambah
          </button>
        </div>
      </div>
      <table className="table-auto w-full overflow-auto">
        <thead>
          <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 w-[100px]">
              Id
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
              Menu
            </th>
            <td className="h-12 px-4 align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 text-right">
              Hapus?
            </td>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {menu.map((menuItem, i) => (
            <tr
              key={i}
              className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
            >
              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium">
                {menuItem.id}
              </td>
              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                {menuItem.name}
              </td>
              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 flex justify-end">
                <button
                  className="scale-150 text-red-600 text-opacity-60 hover:text-opacity-100"
                  onClick={() => handleDeleteMenu(menuItem.id)}
                >
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <caption className="mt-4 text-sm text-muted-foreground caption-bottom text-gray-500">
          Daftar menu restoran
        </caption>
      </table>
    </section>
  );
}

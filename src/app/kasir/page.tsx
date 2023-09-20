"use client";

import { useResetContext } from "@/context/ResetContext";
import React, { useEffect, useState } from "react";

export default function Kasir() {
  const [allOrder, setAllOrder] = useState<[]>([]);
  const [selectMeja, setSelectMeja] = useState<string>("");
  const [showOrderPerMeja, setShowOrderPerMeja] = useState<[] | null>(null);
  const { reset } = useResetContext();
  
  useEffect(() => {
    const getAllOrder: any = localStorage.getItem("order");
    if (getAllOrder) {
      setAllOrder(JSON.parse(getAllOrder));
    }
    if(reset){
      setAllOrder([])
      setSelectMeja('')
    }
  }, [reset]);
  
  const uniqueMeja = allOrder.reduce((mejaList: any, order: any) => {
    if (!mejaList.includes(order.meja)) {
      mejaList.push(order.meja);
    }
    return mejaList;
  }, []);

  const handleSelectMeja = (e: any) => {
    setSelectMeja(e.target.value);
  };

  const handleClickShowChooseMeja = () => {
    const filterChooseMeja: any = allOrder.filter(
      (order: any) => order.meja === selectMeja
    );
    setShowOrderPerMeja(filterChooseMeja);
  };

  const handleClickDeleteMeja = () => {
    const newData: any = allOrder.filter(
      (order: any) => order.meja !== selectMeja
    );
    setAllOrder(newData);
    setSelectMeja("");
    setShowOrderPerMeja(null)
    localStorage.setItem("order", JSON.stringify(newData));
  };

  return (
    <section className="bg-[#F1F5F9] mt-4 px-6 py-4 rounded-md min-h-[300px] lg:w-1/2 md:w-2/3 w-full">
      <div className="space-y-1">
        <label htmlFor="meja" className="text-sm">
          Meja
        </label>
        <div className="w-full flex">
          <div className="w-1/2 space-x-2 flex">
            <select
              name="meja"
              id="meja"
              className="h-10 px-4 text-sm rounded-md w-1/2"
              onChange={handleSelectMeja}
            >
              <option value="">Pilih meja</option>
              {uniqueMeja.map((meja: string) => (
                <option value={meja} key={meja}>
                  {meja}
                </option>
              ))}
            </select>
            <button
              className={`${
                selectMeja === "" ? "bg-[#808691]" : "bg-[#0F172A]"
              }  text-white px-3 rounded-md text-sm w-1/2`}
              disabled={selectMeja === ""}
              onClick={handleClickShowChooseMeja}
            >
              Print struk
            </button>
          </div>
          <div className="w-1/2 flex justify-end">
            <button
              className={`${
                selectMeja === "" ? "hidden" : ""
              } w-1/2 bg-red-600 rounded-md text-white`}
              onClick={handleClickDeleteMeja}
            >
              Kosongkan meja
            </button>
          </div>
        </div>
      </div>
      <table
        className={`${
          !showOrderPerMeja || selectMeja === "" ? "hidden" : ""
        }  table-auto w-full overflow-auto`}
      >
        <thead>
          <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 w-[100px]">
              Jumlah
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
              Menu
            </th>
            <td className="h-12 px-4 align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 text-right">
              harga
            </td>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {!showOrderPerMeja
            ? null
            : showOrderPerMeja.map((item: any, i: number) => (
                <tr
                  className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  key={i}
                >
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium">
                    {item.quantity}
                  </td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                    {item.menu}
                  </td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 flex justify-end">
                    gratis
                  </td>
                </tr>
              ))}
        </tbody>
        <caption className="mt-4 text-sm text-muted-foreground">
          Daftar menu restoran
        </caption>
      </table>
    </section>
  );
}

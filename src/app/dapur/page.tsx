"use client";

import { useResetContext } from "@/context/ResetContext";
import React, { useEffect, useState } from "react";

export default function Dapur() {
  const [allOrder, setAllOrder] = useState<[]>([]);
  const { reset } = useResetContext();

  useEffect(() => {
    const storedAllOrder: any = localStorage.getItem("order");
    if (storedAllOrder) {
      setAllOrder(JSON.parse(storedAllOrder));
    } 
    if(reset){
      setAllOrder([])
    }
  }, [reset,setAllOrder]);

  function filterMeja(meja: string) {
    const filter = allOrder.filter((order: any) => order.meja === meja);
    return filter;
  }

  console.log(reset)

  return (
    <section className="bg-[#F1F5F9] mt-4 px-6 py-4 rounded-md min-h-[300px] lg:w-1/2 md:w-2/3 w-full">
      <div className="flex">
        <div className="w-1/3 space-y-4">
          <h3 className="font-semibold text-xl leading-none">Meja 1</h3>
          <div>
            {filterMeja("1").map((order: any, i) => (
              <div className="flex text-sm text-gray-500" key={i}>
                <div className="w-[30px] ">{order.quantity} x</div>
                <div className="w-full">{order.menu}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/3 space-y-4">
          <h3 className="font-semibold text-xl leading-none">Meja 2</h3>
          <div>
            {filterMeja("2").map((order: any, i) => (
              <div className="flex text-sm text-gray-500" key={i}>
                <div className="w-[30px] ">{order.quantity} x</div>
                <div className="w-full">{order.menu}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/3 space-y-4">
          <h3 className="font-semibold text-xl leading-none">Meja 3</h3>
          <div>
            {filterMeja("3").map((order: any, i) => (
              <div className="flex text-sm text-gray-500" key={i}>
                <div className="w-[30px] ">{order.quantity} x</div>
                <div className="w-full">{order.menu}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

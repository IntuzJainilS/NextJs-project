"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function PriceRangeFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const minParam = searchParams.get("min") || "";
    const maxParam = searchParams.get("max") || "";

    const [min, setMin] = useState(minParam);
    const [max, setMax] = useState(maxParam);

    const applyFilter = () => {
        const params = new URLSearchParams(searchParams.toString());

        const minNum = min ? Number(min) : null;
        const maxNum = max ? Number(max) : null;

        if (minNum !== null && maxNum !== null && minNum > maxNum) {
            alert("Min price should be less than Max price");
            return;
        }
        if(minNum === maxNum){
            alert("maximum number and minimum number cannot be same ");
            return;
        }

        if (minNum !== null) params.set("min", String(minNum));
        else params.delete("min");

        if (maxNum !== null) params.set("max", String(maxNum));
        else params.delete("max");

        router.push(`/products?${params.toString()}`);
    };

    return (
        <div className="border p-4 rounded space-y-3 mt-2.5">
            <h3 className="font-semibold">Price Range</h3>

            <input
                type="number"
                placeholder="Min"
                value={min}
                onChange={(e) => setMin(e.target.value)}
                className="w-full border px-2 py-1 rounded"
            />

            <input
                type="number"
                placeholder="Max"
                value={max}
                onChange={(e) => setMax(e.target.value)}
                className="w-full border px-2 py-1 rounded"
            />

            <button
                onClick={applyFilter}
                className="w-full bg-black text-white py-1 rounded hover:bg-gray-800"
            >
                Apply
            </button>
        </div>
    );
}



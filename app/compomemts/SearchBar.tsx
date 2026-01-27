"use client"
import { useRouter } from "next/navigation"
import { useState, ChangeEvent, useEffect } from "react";

interface iDefault {
    defaultValue?: string;
}

const SearchBar = ({ defaultValue }: iDefault) => {

    const router = useRouter();

    const [inputValue, setInputValue] = useState(defaultValue ?? "");

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setInputValue(inputValue);
    }

    useEffect(() => {
        const delay = setTimeout(() => {
            const value = inputValue.trim();

            if (!value) {
                router.push("/products");
                return;
            }

            if (value.length < 3) return;

            router.push(`/products?q=${encodeURIComponent(value)}`);
        }, 500);

        return () => clearTimeout(delay);
    }, [inputValue, router]);

    return (
        <div className="flex justify-center mt-6">
            <div className="border p-4 rounded-2xl space-y-3 m-2 bg-amber-50 w-200">
                <input
                    type="text"
                    id="inputId"
                    placeholder="Enter your keywords"
                    value={inputValue ?? ""}
                    onChange={handleChange}
                    className="bg-transparent outline-none border-none w-full py-3 pl-2 pr-3"
                />
            </div>
        </div>
    );

}

export default SearchBar

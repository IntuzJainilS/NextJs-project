"use client"
import { useRouter } from "next/navigation"
import { useState, ChangeEvent, use } from "react";

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

    const handlesearch = () => {
        if (inputValue) return router.push(`/products?q=${inputValue}`);
        if (!inputValue) return router.push("/products")

    }

    const handleKeyPress = (event: { key: any; }) => {
        if (event.key === "Enter") return handlesearch();
    }

    return (
        <div className="border p-4 rounded-sm space-y-3 m-2">

            <input type="text"
                id="inputId"
                placeholder="Enter your keywords"
                value={inputValue ?? ""} onChange={handleChange}
                onKeyDown={handleKeyPress}
                className="bg-transparent outline-none border-none w-full py-3 pl-2 pr-3" />

        </div>
    )
}

export default SearchBar

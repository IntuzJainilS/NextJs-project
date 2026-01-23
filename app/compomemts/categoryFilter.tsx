"use client"

import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  categories: string[];
};
const CategoryFilter = ({ categories }: Props) => {
    const router = useRouter();
    const searchparams = useSearchParams();

    const selected = searchparams.getAll("category");
    // console.log("selected",selected);

    const toggleCategory = (cat: string) => {
    const params = new URLSearchParams(searchparams.toString());

    if (selected.includes(cat)) {
      const filtered = selected.filter((c) => c !== cat);
      params.delete("category");
      filtered.forEach((c) => params.append("category", c));
    } else {
      params.append("category", cat);
    }

    router.push(`/products?${params.toString()}`);
  };

  return (
     <div className="border p-4 rounded space-y-2">
      <h3 className="font-semibold mb-2">Categories</h3>

      {categories.map((cat:string) => (
        <label key={cat} className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={selected.includes(cat)}
            onChange={() => toggleCategory(cat)}
          />
          {cat}
        </label>
      ))}
    </div>
  )
}

export default CategoryFilter

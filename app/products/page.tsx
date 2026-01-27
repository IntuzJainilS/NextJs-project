import SearchBar from "../compomemts/SearchBar";
import ProductsList from "./ProductList";
import CategoryFilter from "../compomemts/categoryFilter";
import PriceRangeFilter from "../compomemts/PriceRangeFilter";
import { Suspense } from "react";
import Loader from "../compomemts/Loader";
import API_URL from "@/utils/utils"


type Props = {
  searchParams: Promise<{
    q?: string;
    category?: string | string[];
    min?: string;
    max?: string;
  }>;
};

async function getCategories() {
  const res = await fetch(
    `${API_URL}/products/categories`,
    { cache: "no-store" }
  );
  
  return res.json();
}

export default async function Products({ searchParams }: Props) {
  const params = await searchParams;

  const query = params?.q || "";

  const categoryParam = params?.category;

  const selectedCategories = Array.isArray(categoryParam)
    ? categoryParam
    : categoryParam
      ? [categoryParam]
      : [];

  const min = params?.min ? Number(params.min) : null;
  const max = params?.max ? Number(params.max) : null;

  const categories = await getCategories();

   return (
    <div className="p-4 sm:p-6 space-y-6 bg-linear-to-t from-sky-300 to-indigo-300 min-h-screen">
      <SearchBar defaultValue={query} />

      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="w-full lg:w-72 border rounded-xl p-4 h-fit bg-amber-50 lg:sticky lg:top-24">
          <h3 className="font-bold mb-4 text-lg text-center lg:text-left">Filters</h3>

          <CategoryFilter categories={categories} />
          <PriceRangeFilter />
        </aside>

        <main className="flex-1 border-4 m-2 p-2 bg-blue-200">
          <h2 className="text-2xl font-bold mb-6 text-center lg:text-center">All Products</h2>

          <Suspense fallback={<Loader />}>
            <ProductsList
              query={query}
              categories={selectedCategories}
              min={min}
              max={max}
            />
          </Suspense>
        </main>
      </div>
    </div>
  );  
}

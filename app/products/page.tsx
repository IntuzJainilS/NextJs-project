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
    <div className="p-6 space-y-6">
      <SearchBar defaultValue={query} />

      <div className="flex gap-6">
        <aside className="w-300px shrink-0 border rounded p-4 h-fit mt-40 sticky top-3">
          <h3 className="font-bold mb-4 text-lg ml-58">Filters</h3>

          <CategoryFilter categories={categories} />
          <PriceRangeFilter />
        </aside>

        <main className="flex-1">
          <h2 className="text-2xl font-bold mb-6 ml-155">All Products</h2>

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

import SearchBar from "../compomemts/SearchBar";
import ProductsList from "./ProductList";
import CategoryFilter from "../compomemts/categoryFilter";
import PriceRangeFilter from "../compomemts/PriceRangeFilter";
import { Suspense } from "react";
import Loader from "../compomemts/Loader";

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
    "https://fakestoreapi.com/products/categories",
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
    <div className="p-6">
      <SearchBar defaultValue={query} />

      <CategoryFilter categories={categories} />
      <PriceRangeFilter/>

      <h2 className="text-2xl font-bold mb-6">All Products</h2>

        <Suspense fallback={<Loader/>}>
      <ProductsList query={query} categories={selectedCategories} min={min}
        max={max} />
        </Suspense>
    </div>
  );  
}

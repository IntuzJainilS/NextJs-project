import SearchBar from "../compomemts/SearchBar";
import ProductsList from "./ProductList";
import CategoryFilter from "../compomemts/categoryFilter";

type Props = {
  searchParams: Promise<{
    q?: string;
    category?: string | string[];
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

  const categories = await getCategories();

  return (
    <div className="p-6">
      <SearchBar defaultValue={query} />

      <CategoryFilter categories={categories} />

      <h2 className="text-2xl font-bold mb-6">All Products</h2>

      <ProductsList query={query} categories={selectedCategories} />
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import API_URL from "@/utils/utils"

type ProductType = {
    id: number;
    title: string;
    image: string;
    price: number;
    category: string;
    description: string;
};

// console.log("API_BASE_URL =", API_URL);

// const api = process.env.NEXT_PUBLIC_API_URL;
// console.log("api")

async function getProducts() {
    const res = await fetch("https://fakestoreapi.com/products", {
        cache: "no-store",
    });
    return res.json();
}

type Props = {
    query: string;
    categories: string[];
    min: number | null;
    max: number | null;
};

export default async function ProductsList({
    query,
    categories,
    min,
    max,
}: Props) {
    const products: ProductType[] = await getProducts();

    const safeQuery = (query || "").toLowerCase();

    const filteredProducts = products.filter((p) => {
        const matchTitle = p.title
            .toLowerCase()
            .includes(safeQuery);

        const matchCategory =
            categories.length === 0 || categories.includes(p.category);

        const matchPrice =
            (min === null || p.price >= min) &&
            (max === null || p.price <= max);

        return matchTitle && matchCategory && matchPrice;
    });

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
                <div
                    key={p.id}
                    className="border rounded-lg p-4 shadow hover:shadow-lg transition bg-white flex flex-col justify-between"
                >
                    <div>
                        <Image
                            src={p.image}
                            alt={p.title}
                            width={200}
                            height={200}
                            className="h-40 w-full object-contain mb-3"
                        />
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                            {p.title}
                        </h3>

                        <p className="text-xl font-bold mb-1">$ {p.price}</p>

                        <p className="text-sm text-gray-500 mb-4">
                            {p.category}
                        </p>
                    </div>

                    <Link
                        href={`/products/${p.id}`}
                        className="mt-auto text-center bg-black text-white py-2 rounded hover:bg-gray-800 transition"
                    >
                        View Details
                    </Link>
                </div>
            ))}
        </div>
    );
}

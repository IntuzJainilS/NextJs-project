import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-32">
      <h2 className="text-3xl font-bold mb-4">Product Not Found 😕</h2>

      <p className="mb-6 text-gray-500">
        The product you are looking for does not exist.
      </p>

      <Link
        href="/products"
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
      >
        Back to Products
      </Link>
    </div>
  );
}

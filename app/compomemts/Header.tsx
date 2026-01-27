import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-wide text-gray-900 hover:text-indigo-600 transition"
        >
          ProductCatalog
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-6">
          <Link
            href="/products"
            className="text-gray-700 font-extrabold hover:text-indigo-600 transition"
          >
            Products
          </Link>
        </nav>
      </div>
    </header>
  );
}

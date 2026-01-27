import Image from "next/image";
import { notFound } from "next/navigation";
import API_URL from "@/utils/utils"


type Props = {
  params: Promise<{ id: string }>;
};

type ProductType = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
};

export default async function Product({ params }: Props) {
  const { id } = await params;


  try {
    const res = await fetch(`${API_URL}/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return notFound();

    const product: ProductType = await res.json();

    if (!product || Object.keys(product).length === 0) {
      return notFound();
    }

    return (
      <div className="min-h-screen bg-linear-to-t from-sky-300 to-indigo-300 py-12 px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">

            {/* Image Section */}
            <div className="flex items-center justify-center bg-slate-100 rounded-xl p-6">
              <Image
                src={product.image}
                width={280}
                height={280}
                alt={product.title}
                loading="eager"
                className="object-contain hover:scale-105 transition-transform duration-300 max-h-80"
              />
            </div>

            {/* Content Section */}
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl font-bold text-slate-800 mb-4">
                {product.title}
              </h1>

              <p className="text-2xl font-semibold text-indigo-600 mb-4">
                ${product.price}
              </p>

              <p className="text-slate-600 leading-relaxed mb-6">
                {product.description}
              </p>

            </div>

          </div>
        </div>
      </div>
    );
    ;
  } catch (error) {
    console.error("Fetch error:", error);
    return notFound();
  }
}
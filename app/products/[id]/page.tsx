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

  const numericId = Number(id);
  if (isNaN(numericId) || numericId > 20) {
    notFound();
  }

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
      <div className="p-6 max-w-3xl mx-auto">
        <Image
          src={product.image}
          width={300}
          height={360}
          alt={product.title}
          loading="eager"
          className="mx-auto mb-6 object-contain"
        />
        <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
        <p className="text-xl font-semibold mb-2">$ {product.price}</p>
        <p className="text-gray-600">{product.description}</p>
      </div>
    );
  } catch (error) {
    console.error("Fetch error:", error);
    return notFound();
  }
}
import Image from "next/image";

type props = {
    params: {
        id: string;
    };
}

type ProductType = {
    id: number;
    title: string;
    price: number;
    image: string;
    description: string;
}

export default async function Product({ params }: props) {
    const { id } = await params;

    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
        cache: "no-store",
    });
    if (!res.ok) {
        throw new Error("Failed to fetch product");
    }

    const product: ProductType = await res.json();

    return (
        <>
            <Image src={product.image} width={300}
                height={360} alt={product.title}></Image>
            <h1>{product.title}</h1>
            <p>${product.price}</p>
            <p>{product.description}</p>
        </>
    );

}
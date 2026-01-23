import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="text-center text-2xl">hello</h1>
      <Link href='/products'>Products</Link>
    </div>
  );
}

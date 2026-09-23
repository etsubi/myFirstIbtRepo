import { notFound } from "next/navigation";
import Link from "next/link";

const dishes = {
  "doro-wat": {
    name: "Doro Wat",
    price: 350,
    description: "A spicy Ethiopian chicken stew served with injera.",
  },
  kitfo: {
    name: "Kitfo",
    price: 420,
    description: "Minced beef seasoned with Ethiopian spices and butter.",
  },
  tibs: {
    name: "Tibs",
    price: 390,
    description: "Sautéed beef with peppers, onions and Ethiopian spices.",
  },
};

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DishPage({ params }: PageProps) {
  const { id } = await params;

  const dish = dishes[id as keyof typeof dishes];

  if (!dish) {
    notFound();
  }

  return (
    <main>
      <h1>{dish.name}</h1>

      <p>{dish.description}</p>

      <p>
        <strong>{dish.price} ETB</strong>
      </p>

      <Link href="/menu">Back to Menu</Link>
    </main>
  );
}

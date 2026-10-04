import { notFound } from "next/navigation";

const dishes = [
  {
    id: "doro-wat",
    name: "Doro Wat",
    price: 1050,
    category: "Traditional",
    description:
      "A rich Ethiopian chicken stew prepared with berbere, onions, garlic, and spices.",
  },
  {
    id: "kitfo",
    name: "Kitfo",
    price: 1420,
    category: "Traditional",
    description:
      "Traditional Ethiopian minced beef dish seasoned with spices and clarified butter.",
  },
  {
    id: "tibs",
    name: "Tibs",
    price: 1290,
    category: "Traditional",
    description:
      "Tender pieces of meat sautéed with onions, peppers, and Ethiopian spices.",
  },
  {
    id: "cheesecake",
    name: "Cheesecake",
    price: 580,
    category: "Dessert",
    description: "Creamy cheesecake served as a sweet finish to your meal.",
  },
  {
    id: "chocolate-cake",
    name: "Chocolate Cake",
    price: 520,
    category: "Dessert",
    description: "Rich chocolate cake with a soft and delicious texture.",
  },
];

export function generateStaticParams() {
  return dishes.map((dish) => ({
    id: dish.id,
  }));
}

export default async function DishPage({ params }) {
  const { id } = await params;

  const dish = dishes.find((item) => item.id === id);

  if (!dish) {
    notFound();
  }

  return (
    <article>
      <h2>{dish.name}</h2>

      <p>Category: {dish.category}</p>

      <p>Price: {dish.price} ETB</p>

      <p>{dish.description}</p>
    </article>
  );
}

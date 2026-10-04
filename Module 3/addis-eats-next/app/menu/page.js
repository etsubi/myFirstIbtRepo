import Link from "next/link";

const dishes = [
  {
    id: "doro-wat",
    name: "Doro Wat",
    price: 1050,
    category: "Traditional",
  },
  {
    id: "kitfo",
    name: "Kitfo",
    price: 1420,
    category: "Traditional",
  },
  {
    id: "tibs",
    name: "Tibs",
    price: 1290,
    category: "Traditional",
  },
  {
    id: "cheesecake",
    name: "Cheesecake",
    price: 580,
    category: "Dessert",
  },
  {
    id: "chocolate-cake",
    name: "Chocolate Cake",
    price: 520,
    category: "Dessert",
  },
];

export default function MenuPage() {
  return (
    <div>
      {dishes.map((dish) => (
        <article key={dish.id}>
          <h3>{dish.name}</h3>

          <p>{dish.category}</p>

          <p>{dish.price} ETB</p>

          <Link href={`/menu/${dish.id}`}>View Dish</Link>
        </article>
      ))}
    </div>
  );
}

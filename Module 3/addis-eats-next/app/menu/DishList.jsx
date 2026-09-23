import Link from "next/link";

const dishes = [
  {
    id: "doro-wat",
    name: "Doro Wat",
    price: 1050,
  },
  {
    id: "kitfo",
    name: "Kitfo",
    price: 1420,
  },
  {
    id: "tibs",
    name: "Tibs",
    price: 1390,
  },
];

export default function DishList() {
  return (
    <ul>
      {dishes.map((dish) => (
        <li key={dish.id}>
          <h2>{dish.name}</h2>

          <p>{dish.price} ETB</p>

          <Link href={`/menu/${dish.id}`}>View Dish</Link>
        </li>
      ))}
    </ul>
  );
}

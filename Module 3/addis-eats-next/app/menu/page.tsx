import Link from "next/link";
import DishList from "./DishList";

export default function MenuPage() {
  return (
    <main>
      <h1>Our Menu</h1>

      <p>Choose a delicious Ethiopian dish.</p>

      <DishList />

      <br />

      <Link href="/">Back Home</Link>
    </main>
  );
}

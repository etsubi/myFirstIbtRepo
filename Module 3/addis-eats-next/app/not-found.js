import Link from "next/link";

export default function NotFound() {
  return (
    <section>
      <h2>Dish Not Found</h2>

      <p>Sorry, we could not find the dish you are looking for.</p>

      <Link href="/menu">Back to Menu</Link>
    </section>
  );
}

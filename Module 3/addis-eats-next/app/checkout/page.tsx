import Link from "next/link";

export default function CheckoutPage() {
  return (
    <main>
      <h1>Checkout</h1>

      <p>Complete your order here.</p>

      <nav>
        <Link href="/cart">Back to Cart</Link>
        {" | "}
        <Link href="/">Back Home</Link>
      </nav>
    </main>
  );
}

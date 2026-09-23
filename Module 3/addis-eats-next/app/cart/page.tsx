import Link from "next/link";

export default function CartPage() {
  return (
    <main>
      <h1>Your Cart</h1>

      <p>Your cart is currently empty.</p>

      <nav>
        <Link href="/menu">Continue Shopping</Link>
        {" | "}
        <Link href="/checkout">Go to Checkout</Link>
      </nav>
    </main>
  );
}

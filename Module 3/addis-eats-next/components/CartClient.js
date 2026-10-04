"use client";

import { useCartStore } from "../store/cartStore";

export default function CartClient() {
  const cart = useCartStore((state) => state.cart);

  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div>
      {cart.map((item) => (
        <article key={item.id}>
          <h3>{item.name}</h3>

          <p>
            {item.quantity} × {item.price} ETB
          </p>

          <button type="button" onClick={() => removeFromCart(item.id)}>
            Remove
          </button>
        </article>
      ))}

      <h3>Total: {total} ETB</h3>
    </div>
  );
}

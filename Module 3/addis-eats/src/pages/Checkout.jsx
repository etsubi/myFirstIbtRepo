import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useCartStore from "../store/cartStore";

function Checkout() {
  const navigate = useNavigate();

  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const clear = useCartStore((state) => state.clear);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const total = items.reduce((sum, item) => sum + item.price, 0);

  function handleSubmit(event) {
    event.preventDefault();

    if (!name || !phone || !address) {
      alert("Please fill in all fields.");
      return;
    }

    if (items.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    alert(`Order placed successfully!\nTotal: ${total} ETB`);

    clear();

    setName("");
    setPhone("");
    setAddress("");

    navigate("/");
  }

  return (
    <section className="checkout-page">
      <h1>Checkout</h1>

      <p>Complete your order below.</p>

      <div className="cart-summary">
        <h2>Your Order</h2>

        {items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {items.map((item, index) => (
              <div key={`${item.id}-${index}`} className="cart-item">
                <span>
                  {item.name} - {item.price} ETB
                </span>

                <button type="button" onClick={() => removeItem(item.id)}>
                  Remove
                </button>
              </div>
            ))}

            <div className="order-total">
              <strong>Order Total:</strong>
              <strong>{total} ETB</strong>
            </div>

            <button type="button" onClick={clear}>
              Clear Cart
            </button>
          </>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Full Name</label>

          <input
            id="name"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="phone">Phone Number</label>

          <input
            id="phone"
            type="tel"
            placeholder="09XXXXXXXX"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="address">Delivery Address</label>

          <textarea
            id="address"
            placeholder="Enter your delivery address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </div>

        <button type="submit">Place Order</button>
      </form>
    </section>
  );
}

export default Checkout;

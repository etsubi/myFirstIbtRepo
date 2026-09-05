import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Checkout() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!name || !phone || !address) {
      alert("Please fill in all fields.");
      return;
    }

    alert("Order placed successfully!");

    setName("");
    setPhone("");
    setAddress("");

    navigate("/");
  }

  return (
    <section className="checkout-page">
      <h1>Checkout</h1>

      <p>Complete your order below.</p>

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

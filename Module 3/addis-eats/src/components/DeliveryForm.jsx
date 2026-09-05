import { useState } from "react";

const PHONE_REGEX = /^(?:\+251|0)9\d{8}$/;

function DeliveryForm({ total }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "",
  });

  const phoneIsValid = PHONE_REGEX.test(form.phone);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!phoneIsValid) {
      return;
    }

    alert(`Order placed successfully!\nTotal: ${total} ETB`);
  };

  return (
    <section className="delivery-section">
      <h2>Delivery & TeleBirr</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>

        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
          required
        />

        <label htmlFor="phone">TeleBirr Phone Number</label>

        <input
          id="phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          placeholder="09xxxxxxxx"
          required
        />

        {form.phone && (
          <p className={phoneIsValid ? "valid" : "error"}>
            {phoneIsValid
              ? "✓ Valid TeleBirr number"
              : "Enter a valid Ethiopian phone number"}
          </p>
        )}

        <label htmlFor="area">Delivery Area</label>

        <select
          id="area"
          name="area"
          value={form.area}
          onChange={handleChange}
          required
        >
          <option value="">Select your area</option>
          <option value="Bole">Bole</option>
          <option value="Kazanchis">Kazanchis</option>
          <option value="Piassa">Piassa</option>
          <option value="CMC">CMC</option>
          <option value="Gerji">Gerji</option>
          <option value="Mexico">Mexico</option>
        </select>

        <div className="order-total">
          <strong>Order Total:</strong>
          <span>{total.toLocaleString()} ETB</span>
        </div>

        <button type="submit" disabled={!phoneIsValid}>
          Pay with TeleBirr
        </button>
      </form>
    </section>
  );
}

export default DeliveryForm;

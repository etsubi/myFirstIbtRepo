import { useNavigate } from "react-router-dom";
import { useMemo, useRef, useState } from "react";
import useCartStore from "../store/cartStore";

const PHONE_REGEX = /^(?:\+251|0)9\d{8}$/;
const NAME_REGEX = /^[A-Za-z ]+$/;

function validate(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Full name is required.";
  } else if (!NAME_REGEX.test(form.name.trim())) {
    errors.name = "Name can contain letters and spaces only.";
  }

  if (!PHONE_REGEX.test(form.phone)) {
    errors.phone = "Enter a valid Ethiopian phone number.";
  }

  if (!form.area) {
    errors.area = "Please select a delivery area.";
  }

  if (form.notes.length > 150) {
    errors.notes = "Notes must be under 150 characters.";
  }

  return errors;
}

function Checkout() {
  const navigate = useNavigate();

  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const clear = useCartStore((state) => state.clear);

  const total = items.reduce((sum, item) => sum + item.price, 0);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "",
    notes: "",
  });

  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [requestError, setRequestError] = useState("");

  const errors = useMemo(() => validate(form), [form]);

  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const areaRef = useRef(null);
  const notesRef = useRef(null);

  const refs = {
    name: nameRef,
    phone: phoneRef,
    area: areaRef,
    notes: notesRef,
  };

  function handleChange(event) {
    const { name, value } = event.target;

    // Full name: letters and spaces only
    if (name === "name") {
      const cleanedName = value.replace(/[^A-Za-z ]/g, "");

      setForm((prev) => ({
        ...prev,
        name: cleanedName,
      }));

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleBlur(event) {
    const { name } = event.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const allTouched = {
      name: true,
      phone: true,
      area: true,
      notes: true,
    };

    setTouched(allTouched);

    const currentErrors = validate(form);

    if (Object.keys(currentErrors).length > 0) {
      const firstField = Object.keys(currentErrors)[0];

      refs[firstField]?.current?.focus();

      return;
    }

    if (items.length === 0) {
      setRequestError("Your cart is empty.");
      return;
    }

    setSubmitting(true);
    setRequestError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const requestSucceeded = true;

      if (!requestSucceeded) {
        throw new Error("TeleBirr payment failed. Please try again.");
      }

      alert("Order placed successfully!");

      clear();

      setForm({
        name: "",
        phone: "",
        area: "",
        notes: "",
      });

      navigate("/");
    } catch (error) {
      setRequestError(error.message);
    } finally {
      setSubmitting(false);
    }
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
                  {item.name} – {item.price} ETB
                </span>

                <button type="button" onClick={() => removeItem(item.id)}>
                  Remove
                </button>
              </div>
            ))}

            <div className="order-total">
              <strong>Total:</strong>
              <strong>{total} ETB</strong>
            </div>

            <button type="button" onClick={clear}>
              Clear Cart
            </button>
          </>
        )}
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {requestError && (
          <p role="alert" className="error">
            {requestError}
          </p>
        )}

        {/* FULL NAME */}
        <div>
          <label htmlFor="name">Full Name</label>

          <input
            ref={nameRef}
            id="name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!(touched.name && errors.name)}
            aria-describedby="name-error"
          />

          {touched.name && errors.name && (
            <p id="name-error" role="alert" className="error">
              {errors.name}
            </p>
          )}
        </div>

        {/* PHONE */}
        <div>
          <label htmlFor="phone">TeleBirr Phone</label>

          <input
            ref={phoneRef}
            id="phone"
            name="phone"
            type="tel"
            placeholder="09XXXXXXXX"
            value={form.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!(touched.phone && errors.phone)}
            aria-describedby="phone-error"
          />

          {touched.phone && errors.phone && (
            <p id="phone-error" role="alert" className="error">
              {errors.phone}
            </p>
          )}
        </div>

        {/* DELIVERY AREA */}
        <div>
          <label htmlFor="area">Delivery Area</label>

          <select
            ref={areaRef}
            id="area"
            name="area"
            value={form.area}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!(touched.area && errors.area)}
            aria-describedby="area-error"
          >
            <option value="">Select your area</option>
            <option value="Bole">Bole</option>
            <option value="Kazanchis">Kazanchis</option>
            <option value="Piassa">Piassa</option>
            <option value="CMC">CMC</option>
            <option value="Gerji">Gerji</option>
            <option value="Mexico">Mexico</option>
          </select>

          {touched.area && errors.area && (
            <p id="area-error" role="alert" className="error">
              {errors.area}
            </p>
          )}
        </div>

        {/* NOTES */}
        <div>
          <label htmlFor="notes">Notes (Optional)</label>

          <textarea
            ref={notesRef}
            id="notes"
            name="notes"
            rows="3"
            maxLength="150"
            placeholder="Any special instructions?"
            value={form.notes}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!(touched.notes && errors.notes)}
            aria-describedby="notes-error"
          />

          <p>{form.notes.length}/150</p>

          {touched.notes && errors.notes && (
            <p id="notes-error" role="alert" className="error">
              {errors.notes}
            </p>
          )}
        </div>

        {/* SUBMIT */}
        <button type="submit" disabled={submitting || items.length === 0}>
          {submitting ? "Submitting..." : `Pay ${total} ETB with TeleBirr`}
        </button>
      </form>
    </section>
  );
}

export default Checkout;

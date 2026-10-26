"use client";

import { useActionState } from "react";
import { placeOrder } from "../app/actions";

const initialState = {
  success: false,
  errors: {},
  message: "",
};

export default function CheckoutForm() {
  const [state, formAction, pending] = useActionState(placeOrder, initialState);

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" required />

        {state.errors?.name && <p role="alert">{state.errors.name}</p>}
      </div>

      <div>
        <label htmlFor="phone">Phone</label>
        <input id="phone" name="phone" required />

        {state.errors?.phone && <p role="alert">{state.errors.phone}</p>}
      </div>

      {state.message && (
        <p role={state.success ? "status" : "alert"}>{state.message}</p>
      )}

      <button type="submit" disabled={pending}>
        {pending ? "Submitting..." : "Place Order"}
      </button>
    </form>
  );
}

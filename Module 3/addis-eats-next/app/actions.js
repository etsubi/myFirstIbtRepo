"use server";

export async function placeOrder(previousState, formData) {
  const name = formData.get("name")?.trim();
  const phone = formData.get("phone")?.trim();

  const errors = {};

  if (!name || name.length < 2) {
    errors.name = "Name must contain at least 2 characters.";
  }

  if (!phone || !/^09\d{8}$/.test(phone)) {
    errors.phone = "Enter a valid Ethiopian phone number.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
      message: "Please correct the errors below.",
    };
  }

  console.log("Order created:", { name, phone });

  return {
    success: true,
    errors: {},
    message: "Your order was submitted successfully!",
  };
}

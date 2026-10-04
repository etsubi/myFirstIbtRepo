"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      cart: [],

      addToCart: (dish) =>
        set((state) => {
          const existingItem = state.cart.find((item) => item.id === dish.id);

          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === dish.id
                  ? {
                      ...item,
                      quantity: item.quantity + 1,
                    }
                  : item,
              ),
            };
          }

          return {
            cart: [
              ...state.cart,
              {
                ...dish,
                quantity: 1,
              },
            ],
          };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      clearCart: () =>
        set({
          cart: [],
        }),
    }),
    {
      name: "addis-eats-cart",
    },
  ),
);

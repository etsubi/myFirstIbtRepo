import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set) => ({
      items: [],

      addItem: (dish) =>
        set((state) => ({
          items: [...state.items, dish],
        })),

      removeItem: (dishId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== dishId),
        })),

      clear: () =>
        set({
          items: [],
        }),
    }),
    {
      name: "addis-eats-cart",
    },
  ),
);

export default useCartStore;

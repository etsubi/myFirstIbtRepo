"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import useSWR from "swr";
import { useCartStore } from "../../store/cartStore";

const fetcher = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to load menu");
  }

  return response.json();
};

export default function MenuPage() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [addedDish, setAddedDish] = useState("");

  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(searchInput.trim());
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchInput]);

  const { data, error, isLoading } = useSWR("/api/dishes", fetcher, {
    revalidateOnFocus: true,
    dedupingInterval: 2000,
  });

  const dishes = data?.dishes ?? [];

  const filteredDishes = dishes.filter((dish) => {
    const matchesSearch = dish.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory = category === "All" || dish.category === category;

    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (dish) => {
    addToCart(dish);
    setAddedDish(dish.id);
  };

  if (isLoading) {
    return <p>Loading menu...</p>;
  }

  if (error) {
    return <p>Could not load the menu. Please try again.</p>;
  }

  return (
    <div>
      <div className="menu-controls">
        <input
          type="search"
          placeholder="Search dishes..."
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          aria-label="Search dishes"
        />

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          aria-label="Filter by category"
        >
          <option value="All">All categories</option>
          <option value="Traditional">Traditional</option>
          <option value="Dessert">Dessert</option>
        </select>
      </div>

      {filteredDishes.length === 0 ? (
        <p>No dishes match your search.</p>
      ) : (
        filteredDishes.map((dish) => (
          <article key={dish.id}>
            <h3>{dish.name}</h3>
            <p>{dish.category}</p>
            <p>{dish.price} ETB</p>

            <div className="dish-actions">
              <Link href={`/menu/${dish.id}`}>View Dish</Link>

              <button type="button" onClick={() => handleAddToCart(dish)}>
                Add to Cart
              </button>
            </div>

            {addedDish === dish.id && (
              <p role="status">{dish.name} added to cart!</p>
            )}
          </article>
        ))
      )}
    </div>
  );
}
